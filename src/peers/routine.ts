import { URLMask } from '../utils/url';
import { JsonSuccessResponse, JsonErrorResponse, getError } from '../json-rpc';
import { startPeerHandshake } from './peer-handshake';
import { check, t } from '../type-validation';
import { getLocalExternalIP } from '../utils/ip';
import { getSeedPeersUrls } from './seed-peers';

export async function findAndConnectPeers() {
  const peerUrls = global.peerList.getPeers().map((peer) => peer.connectionUrl);

  global.consoleLog(
    `${getLocalExternalIP()}:${
      global.config.JSON_RPC_PORT
    } iniating listPeers request to current peers:`,
    peerUrls.map((u) => u.toString())
  );

  const newUrls: URLMask[] = [];

  const addNewUrl = (newUrl: URLMask): void => {
    const isInPeerUrls = !!peerUrls.find((url) => url.eq(newUrl));
    const isInNewUrls = !!newUrls.find((url) => url.eq(newUrl));
    const selfPort = global.config.JSON_RPC_PORT;
    const isAddingSelf =
      newUrl.eq(`http://localhost:${selfPort}`) ||
      newUrl.eq(`http://127.0.0.1:${selfPort}`) ||
      newUrl.eq(`http://${getLocalExternalIP()}:${selfPort}`);
    if (!isInPeerUrls && !isInNewUrls && !isAddingSelf) {
      newUrls.push(newUrl);
    }
  };

  try {
    const seedPeers = getSeedPeersUrls();
    seedPeers.forEach(addNewUrl);
  } catch (error) {
    global.consoleLog('Error reading seed peers', error);
  }

  await Promise.all(
    global.peerList.getTrustedPeers().map(async (peer) => {
      try {
        const response:
          | JsonSuccessResponse
          | JsonErrorResponse = await peer.sendRequest('kami_listPeers', []);

        if (!('result' in response)) {
          throw getError(response.error);
        }

        if (!(response.result instanceof Array)) {
          global.consoleLog('Invalid response while list peer', response);
          throw new Error('Kami List peers did not return an array');
        }

        response.result.forEach((peerObj) => {
          if (check(peerObj.walletAddress, t.hex20)) {
            addNewUrl(new URLMask(peerObj.connectionUrl));
          }
        });
      } catch (err) {
        global.consoleLog('Error fetching new peers to add', err);
      }
    })
  );

  global.consoleLog('new urls got to handshake', newUrls);

  await Promise.all(
    newUrls.map(async (url) => {
      try {
        global.consoleLog(`starting handshaking with ${url}`);
        await startPeerHandshake(url);
        global.consoleLog(`handshake with ${url} success`);
      } catch (err) {
        global.consoleLog(
          `Error connecting to peer: ${url.toString()}`,
          err.message
        );
      }
    })
  );

  return;
}

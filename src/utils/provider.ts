import { ethers } from 'ethers';
import { Bytes32 } from './bytes';
import { t, validate } from '../type-validation';

export interface BlockCompact {
  blockNumber: number;
  transactionsRoot: Bytes32;
  receiptsRoot: Bytes32;
  blockHash: Bytes32;
}

interface ParityBlock extends ethers.providers.Block {
  transactionsRoot: 'string';
  receiptsRoot: 'string';
}

export async function fetchBlocks(
  startBlockNumber: number,
  bunchDepth: number,
  provider: { send(method: string, params: any[]): Promise<any> }
): Promise<BlockCompact[]> {
  validate(startBlockNumber, t.uint);
  validate(bunchDepth, t.uint);
  const blockNumbersToScan = [...Array(2 ** bunchDepth).keys()].map(
    (n) => n + startBlockNumber
  );
  const blockArray: BlockCompact[] = new Array(2 ** bunchDepth);
  await Promise.all(
    blockNumbersToScan.map((currentBlockNumber) => {
      return new Promise(async function (resolve, reject) {
        // console.log('initial wait', currentBlockNumber);
        randomWait(bunchDepth);

        const blockNumberHex = ethers.utils.hexStripZeros(
          ethers.utils.hexlify(currentBlockNumber)
        );

        let block: ParityBlock | null = null;

        let error: any;
        for (let i = 0; i < 200; i++) {
          try {
            const blockPromise = provider
              .send('eth_getBlockByNumber', [
                blockNumberHex !== '0x' ? blockNumberHex : '0x00',
                true,
              ])
              .catch((err) => {
                // console.log('catch1', err.code);
              })
              .then((val) => {
                block = val;
              });

            await Promise.race([blockPromise, sleep(20000)]);

            if (!block) throw { code: 'TIMEOUT' };

            // Promise.block = await blockPromise;
            // console.log('resolved', currentBlockNumber);
            break;
          } catch (err) {
            error = err;
            if (err.code === 'SERVER_ERROR' || err.code === 'TIMEOUT') {
              // console.log('wait', currentBlockNumber, err.code);
              randomWait(bunchDepth);
            } else {
              throw err;
            }
          }
        }

        if (!block) {
          throw error;
        }

        blockArray[currentBlockNumber - startBlockNumber] = {
          blockNumber: currentBlockNumber,
          transactionsRoot: new Bytes32(
            ethers.utils.arrayify(block.transactionsRoot)
          ),
          // @ts-ignore
          receiptsRoot: new Bytes32(ethers.utils.arrayify(block.receiptsRoot)),
          // @ts-ignore
          blockHash: new Bytes32(block.hash),
        };

        resolve();
      });
    })
  );

  return blockArray;
}

async function randomWait(bunchDepth: number) {
  const wait = Math.floor(Math.random() * 2 ** bunchDepth * 10);
  await sleep(wait);
}

async function sleep(time: number) {
  await new Promise((res) => setTimeout(res, time));
}

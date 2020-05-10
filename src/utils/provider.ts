import { ethers } from 'ethers';
import { Bytes32 } from './bytes';

interface BlockCompact {
  blockNumber: number;
  transactionsRoot: Bytes32;
  receiptsRoot: Bytes32;
}

interface ParityBlock {
  transactionsRoot: 'string';
  receiptsRoot: 'string';
}

export async function fetchBlocks(
  startBlockNumber: number,
  bunchDepth: number,
  provider:
    | ethers.providers.JsonRpcProvider
    | ethers.providers.Web3Provider
    | ethers.providers.InfuraProvider
): Promise<BlockCompact[]> {
  const blockNumbersToScan = [...Array(2 ** bunchDepth).keys()].map(
    (n) => n + startBlockNumber
  );
  const blockArray: BlockCompact[] = new Array(2 ** bunchDepth);
  await Promise.all(
    blockNumbersToScan.map((currentBlockNumber) => {
      return new Promise(async function (resolve, reject) {
        const blockNumberHex = ethers.utils.hexStripZeros(
          ethers.utils.hexlify(currentBlockNumber)
        );

        const block: ParityBlock = await provider.send('eth_getBlockByNumber', [
          blockNumberHex,
          true,
        ]);
        console.log(`Received block ${currentBlockNumber} from ESN node`);

        blockArray[currentBlockNumber - startBlockNumber] = {
          blockNumber: currentBlockNumber,
          transactionsRoot: new Bytes32(
            ethers.utils.arrayify(block.transactionsRoot)
          ),
          receiptsRoot: new Bytes32(ethers.utils.arrayify(block.receiptsRoot)),
        };

        resolve();
      });
    })
  );

  return blockArray;
}

import { ethers } from 'ethers';
import { Bytes32 } from './bytes';
import { t, validate } from '../type-validation';

export interface BlockCompact {
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
        const blockNumberHex = ethers.utils.hexStripZeros(
          ethers.utils.hexlify(currentBlockNumber)
        );

        const block: ParityBlock = await provider.send('eth_getBlockByNumber', [
          blockNumberHex !== '0x' ? blockNumberHex : '0x00',
          true,
        ]);

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

import { ethers } from 'ethers';

export interface ContractJson {
  abi: ethers.ContractInterface;
  evm: {
    bytecode: string;
  };
}

/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from 'ethers';
import { Provider, TransactionRequest } from '@ethersproject/providers';
import { Contract, ContractFactory, Overrides } from '@ethersproject/contracts';

import { RandomnessManager } from './RandomnessManager';

export class RandomnessManagerFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<RandomnessManager> {
    return super.deploy(overrides || {}) as Promise<RandomnessManager>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): RandomnessManager {
    return super.attach(address) as RandomnessManager;
  }
  connect(signer: Signer): RandomnessManagerFactory {
    return super.connect(signer) as RandomnessManagerFactory;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): RandomnessManager {
    return new Contract(address, _abi, signerOrProvider) as RandomnessManager;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_numberOfBytes',
        type: 'uint256',
      },
    ],
    name: 'getRandomBytes',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRandomBytes32',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const _bytecode =
  '0x608060405234801561001057600080fd5b50610257806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063ae6dc6fb1461003b578063f5b0fe54146100e2575b600080fd5b6100676004803603602081101561005157600080fd5b8101908080359060200190929190505050610100565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100a757808201518184015260208101905061008c565b50505050905090810190601f1680156100d45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100ea6101a4565b6040518082815260200191505060405180910390f35b60608060008090505b8381101561019a578161011a6101a4565b6040516020018083805190602001908083835b60208310610150578051825260208201915060208101905060208303925061012d565b6001836020036101000a0380198251168184511680821785525050505050509050018281526020019250505060405160208183030381529060405291508080600101915050610109565b5080915050919050565b6000806101af610215565b905060005481146101ca578060008190555060006001819055505b60016000815480929190600101919050555060005460015460405160200180838152602001828152602001925050506040516020818303038152906040528051906020012091505090565b6000600143034090509056fea2646970667358221220253681b7f83ef258838e3751e086de3e278882ea72818a3d9c36f05bf6226e1e64736f6c634300060a0033';

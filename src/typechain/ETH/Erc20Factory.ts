/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { Erc20 } from "./Erc20";

export class Erc20Factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<Erc20> {
    return super.deploy(overrides || {}) as Promise<Erc20>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Erc20 {
    return super.attach(address) as Erc20;
  }
  connect(signer: Signer): Erc20Factory {
    return super.connect(signer) as Erc20Factory;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Erc20 {
    return new Contract(address, _abi, signerOrProvider) as Erc20;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokens",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokens",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "_delegate",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_delegate",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506b1d6757f47b1c8ef70c0000006002819055336000908152602081905260409020556107d3806100426000396000f3fe608060405234801561001057600080fd5b50600436106100a35760003560e01c8063313ce5671161007657806395d89b411161005b57806395d89b41146101f9578063a9059cbb14610201578063dd62ed3e1461022d576100a3565b8063313ce567146101b557806370a08231146101d3576100a3565b806306fdde03146100a8578063095ea7b31461012557806318160ddd1461016557806323b872dd1461017f575b600080fd5b6100b061025b565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100ea5781810151838201526020016100d2565b50505050905090810190601f1680156101175780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101516004803603604081101561013b57600080fd5b506001600160a01b038135169060200135610294565b604080519115158252519081900360200190f35b61016d6102fa565b60408051918252519081900360200190f35b6101516004803603606081101561019557600080fd5b506001600160a01b03813581169160208101359091169060400135610300565b6101bd6104d9565b6040805160ff9092168252519081900360200190f35b61016d600480360360208110156101e957600080fd5b50356001600160a01b03166104de565b6100b06104f9565b6101516004803603604081101561021757600080fd5b506001600160a01b038135169060200135610532565b61016d6004803603604081101561024357600080fd5b506001600160a01b0381358116916020013516610638565b6040518060400160405280600781526020017f457261537761700000000000000000000000000000000000000000000000000081525081565b3360008181526001602090815260408083206001600160a01b038716808552908352818420869055815186815291519394909390927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925928290030190a350600192915050565b60025481565b6001600160a01b03831660009081526020819052604081205482111561036d576040805162461bcd60e51b815260206004820152601b60248201527f45524332303a20494e53554646494349454e545f42414c414e43450000000000604482015290519081900360640190fd5b6001600160a01b03841660009081526001602090815260408083203384529091529020548211156103e5576040805162461bcd60e51b815260206004820152601660248201527f494e53554646494349454e545f414c4c4f57414e434500000000000000000000604482015290519081900360640190fd5b6001600160a01b0384166000908152602081905260409020546104089083610663565b6001600160a01b03851660009081526020818152604080832093909355600181528282203383529052205461043d9083610663565b6001600160a01b038086166000908152600160209081526040808320338452825280832094909455918616815290819052205461047a90836106ac565b6001600160a01b038085166000818152602081815260409182902094909455805186815290519193928816927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a35060019392505050565b601281565b6001600160a01b031660009081526020819052604090205490565b6040518060400160405280600281526020017f455300000000000000000000000000000000000000000000000000000000000081525081565b33600090815260208190526040812054821115610596576040805162461bcd60e51b815260206004820152601b60248201527f45524332303a20494e53554646494349454e545f42414c414e43450000000000604482015290519081900360640190fd5b336000908152602081905260409020546105b09083610663565b33600090815260208190526040808220929092556001600160a01b038516815220546105dc90836106ac565b6001600160a01b038416600081815260208181526040918290209390935580518581529051919233927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a350600192915050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60006106a583836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610706565b9392505050565b6000828201838110156106a5576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b600081848411156107955760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561075a578181015183820152602001610742565b50505050905090810190601f1680156107875780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50505090039056fea2646970667358221220481f4d2b4b98f6f9d5b50fddeb5b772dd0da3b723ee33b47bbd05566b5b6bcf764736f6c63430007010033";

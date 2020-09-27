/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import { ITimeAllyManager } from "./ITimeAllyManager";

export class ITimeAllyManagerFactory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ITimeAllyManager {
    return new Contract(address, _abi, signerOrProvider) as ITimeAllyManager;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      },
      {
        internalType: "uint32",
        name: "_startMonth",
        type: "uint32"
      },
      {
        internalType: "uint32",
        name: "_endMonth",
        type: "uint32"
      }
    ],
    name: "decreaseActiveStaking",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_childStaking",
        type: "address"
      }
    ],
    name: "emitStakingMerge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_oldOwner",
        type: "address"
      },
      {
        internalType: "address",
        name: "_newOwner",
        type: "address"
      }
    ],
    name: "emitStakingTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_month",
        type: "uint32"
      }
    ],
    name: "getMonthlyNRT",
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
        internalType: "uint32",
        name: "_month",
        type: "uint32"
      }
    ],
    name: "getTotalActiveStaking",
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
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      },
      {
        internalType: "uint32",
        name: "_startMonth",
        type: "uint32"
      },
      {
        internalType: "uint32",
        name: "_endMonth",
        type: "uint32"
      }
    ],
    name: "increaseActiveStaking",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakingContract",
        type: "address"
      }
    ],
    name: "isStakingContractValid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "kycDapp",
    outputs: [
      {
        internalType: "contract IKycDapp",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_reward",
        type: "uint256"
      },
      {
        internalType: "enum ITimeAllyManager.RewardType",
        name: "_rewardType",
        type: "uint8"
      }
    ],
    name: "processNrtReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_currentNrtMonth",
        type: "uint32"
      }
    ],
    name: "receiveNrt",
    outputs: [],
    stateMutability: "payable",
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
    name: "removeStaking",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_kycDapp",
        type: "address"
      }
    ],
    name: "setKycDapp",
    outputs: [],
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
        internalType: "uint256",
        name: "_initialIssTime",
        type: "uint256"
      },
      {
        internalType: "uint32",
        name: "_masterEndMonth",
        type: "uint32"
      }
    ],
    name: "splitStaking",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "stake",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  }
];

/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import { ITimeAllyStaking } from "./ITimeAllyStaking";

export class ITimeAllyStakingFactory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ITimeAllyStaking {
    return new Contract(address, _abi, signerOrProvider) as ITimeAllyStaking;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_increaseValue",
        type: "uint256"
      }
    ],
    name: "increaseIssTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "principal",
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
    name: "startMonth",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

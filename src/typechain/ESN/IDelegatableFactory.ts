/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import { IDelegatable } from "./IDelegatable";

export class IDelegatableFactory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IDelegatable {
    return new Contract(address, _abi, signerOrProvider) as IDelegatable;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_month",
        type: "uint32"
      },
      {
        internalType: "bytes",
        name: "_extraData",
        type: "bytes"
      }
    ],
    name: "registerDelegation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

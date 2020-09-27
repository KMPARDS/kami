/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import { IKycDapp } from "./IKycDapp";

export class IKycDappFactory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IKycDapp {
    return new Contract(address, _abi, signerOrProvider) as IKycDapp;
  }
}

const _abi = [
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
        indexed: true,
        internalType: "bytes32",
        name: "username",
        type: "bytes32"
      }
    ],
    name: "IdentityTransfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "username",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "uint8",
        name: "level",
        type: "uint8"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "platformIdentifier",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "specialization",
        type: "bytes32"
      }
    ],
    name: "KycApplied",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "username",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "newKycDetailsIPfS",
        type: "bytes32"
      }
    ],
    name: "KycDetailsUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint8",
        name: "level",
        type: "uint8"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "platformIdentifier",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "specialization",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "KycFeeUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "username",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "uint8",
        name: "level",
        type: "uint8"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "platformIdentifier",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "specialization",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "enum IKycDapp.KYC_STATUS",
        name: "newKycStatus",
        type: "uint8"
      }
    ],
    name: "KycStatusUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "username",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "newProfileDetailsIPfS",
        type: "bytes32"
      }
    ],
    name: "ProfileDetailsUpdated",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_wallet",
        type: "address"
      }
    ],
    name: "getIdentityByAddress",
    outputs: [
      {
        internalType: "bytes32",
        name: "username",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "kycApprovedDetailsIPFS",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "profileDetailsIPFS",
        type: "bytes32"
      },
      {
        internalType: "enum IKycDapp.KYC_STATUS",
        name: "level1",
        type: "uint8"
      },
      {
        internalType: "bool",
        name: "isGovernanceControllable",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_username",
        type: "bytes32"
      }
    ],
    name: "getIdentityByUsername",
    outputs: [
      {
        internalType: "bytes32",
        name: "username",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "kycApprovedDetailsIPFS",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "profileDetailsIPFS",
        type: "bytes32"
      },
      {
        internalType: "enum IKycDapp.KYC_STATUS",
        name: "level1",
        type: "uint8"
      },
      {
        internalType: "bool",
        name: "isGovernanceControllable",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_wallet",
        type: "address"
      },
      {
        internalType: "uint8",
        name: "_level",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "_platformIdentifier",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "_specialization",
        type: "bytes32"
      }
    ],
    name: "getKycStatusByAddress",
    outputs: [
      {
        internalType: "enum IKycDapp.KYC_STATUS",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_username",
        type: "bytes32"
      },
      {
        internalType: "uint8",
        name: "_level",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "_platformIdentifier",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "_specialization",
        type: "bytes32"
      }
    ],
    name: "getKycStatusByUsername",
    outputs: [
      {
        internalType: "enum IKycDapp.KYC_STATUS",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_wallet",
        type: "address"
      },
      {
        internalType: "uint8",
        name: "_level",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "_platformIdentifier",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "_specialization",
        type: "bytes32"
      }
    ],
    name: "isKycApproved",
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
    inputs: [
      {
        internalType: "address",
        name: "_wallet",
        type: "address"
      }
    ],
    name: "isKycLevel1",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "_username",
        type: "bytes32"
      }
    ],
    name: "resolveAddress",
    outputs: [
      {
        internalType: "address",
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
        internalType: "address",
        name: "_wallet",
        type: "address"
      }
    ],
    name: "resolveUsername",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

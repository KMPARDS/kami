/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface KycDappInterface extends ethers.utils.Interface {
  functions: {
    "applyForKyc(uint8,bytes32,bytes32)": FunctionFragment;
    "approveKycDetails(bytes32,bytes32)": FunctionFragment;
    "dayswappers()": FunctionFragment;
    "getIdentityByAddress(address)": FunctionFragment;
    "getIdentityByUsername(bytes32)": FunctionFragment;
    "getKycFee(uint8,bytes32,bytes32)": FunctionFragment;
    "getKycStatusByAddress(address,uint8,bytes32,bytes32)": FunctionFragment;
    "getKycStatusByUsername(bytes32,uint8,bytes32,bytes32)": FunctionFragment;
    "identities(bytes32)": FunctionFragment;
    "identityTransfer(bytes32,address)": FunctionFragment;
    "isKycApproved(address,uint8,bytes32,bytes32)": FunctionFragment;
    "isKycLevel1(address)": FunctionFragment;
    "kycDapp()": FunctionFragment;
    "nrtManager()": FunctionFragment;
    "owner()": FunctionFragment;
    "prepaidEs()": FunctionFragment;
    "proposeKycDetails(bytes32)": FunctionFragment;
    "randomnessManager()": FunctionFragment;
    "register(bytes32)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "resolveAddress(bytes32)": FunctionFragment;
    "resolveUsername(address)": FunctionFragment;
    "resolveUsernameStrict(address)": FunctionFragment;
    "setIdentityOwner(bytes32,address,bool)": FunctionFragment;
    "setInitialValues()": FunctionFragment;
    "setKycDapp(address)": FunctionFragment;
    "timeallyClub()": FunctionFragment;
    "timeallyManager()": FunctionFragment;
    "timeallyPromotionalBucket()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateKycFee(uint8,bytes32,bytes32,uint256)": FunctionFragment;
    "updateKycStatus(bytes32,uint8,bytes32,bytes32,uint8)": FunctionFragment;
    "usernames(address)": FunctionFragment;
    "validatorManager()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "applyForKyc",
    values: [BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "approveKycDetails",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "dayswappers",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getIdentityByAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getIdentityByUsername",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getKycFee",
    values: [BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getKycStatusByAddress",
    values: [string, BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getKycStatusByUsername",
    values: [BytesLike, BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "identities",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "identityTransfer",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "isKycApproved",
    values: [string, BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "isKycLevel1", values: [string]): string;
  encodeFunctionData(functionFragment: "kycDapp", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "nrtManager",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "prepaidEs", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "proposeKycDetails",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "randomnessManager",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "register", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "resolveAddress",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "resolveUsername",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "resolveUsernameStrict",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setIdentityOwner",
    values: [BytesLike, string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setInitialValues",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "setKycDapp", values: [string]): string;
  encodeFunctionData(
    functionFragment: "timeallyClub",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "timeallyManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "timeallyPromotionalBucket",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateKycFee",
    values: [BigNumberish, BytesLike, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateKycStatus",
    values: [BytesLike, BigNumberish, BytesLike, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "usernames", values: [string]): string;
  encodeFunctionData(
    functionFragment: "validatorManager",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "applyForKyc",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveKycDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dayswappers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getIdentityByAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getIdentityByUsername",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getKycFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getKycStatusByAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getKycStatusByUsername",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "identities", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "identityTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isKycApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isKycLevel1",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "kycDapp", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nrtManager", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "prepaidEs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proposeKycDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "randomnessManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "resolveAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "resolveUsername",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "resolveUsernameStrict",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setIdentityOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setInitialValues",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setKycDapp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "timeallyClub",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "timeallyManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "timeallyPromotionalBucket",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateKycFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateKycStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "usernames", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "validatorManager",
    data: BytesLike
  ): Result;

  events: {
    "IdentityTransfer(address,address,bytes32)": EventFragment;
    "KycApplied(bytes32,uint8,bytes32,bytes32)": EventFragment;
    "KycDetailsUpdated(bytes32,bytes32)": EventFragment;
    "KycFeeUpdated(uint8,bytes32,bytes32,uint256)": EventFragment;
    "KycStatusUpdated(bytes32,uint8,bytes32,bytes32,uint8)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "ProfileDetailsUpdated(bytes32,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "IdentityTransfer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "KycApplied"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "KycDetailsUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "KycFeeUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "KycStatusUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProfileDetailsUpdated"): EventFragment;
}

export class KycDapp extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: KycDappInterface;

  functions: {
    applyForKyc(
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    approveKycDetails(
      _username: BytesLike,
      _kycUnapprovedDetailsIPFS: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    dayswappers(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    getIdentityByAddress(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<{
      username: string;
      owner: string;
      kycApprovedDetailsIPFS: string;
      profileDetailsIPFS: string;
      level1: number;
      isGovernanceControllable: boolean;
      0: string;
      1: string;
      2: string;
      3: string;
      4: number;
      5: boolean;
    }>;

    getIdentityByUsername(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      username: string;
      owner: string;
      kycApprovedDetailsIPFS: string;
      profileDetailsIPFS: string;
      level1: number;
      isGovernanceControllable: boolean;
      0: string;
      1: string;
      2: string;
      3: string;
      4: number;
      5: boolean;
    }>;

    getKycFee(
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      _fee: BigNumber;
      0: BigNumber;
    }>;

    getKycStatusByAddress(
      _wallet: string,
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: number;
    }>;

    getKycStatusByUsername(
      _username: BytesLike,
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: number;
    }>;

    identities(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      owner: string;
      kycApprovedDetailsIPFS: string;
      profileDetailsIPFS: string;
      level1: number;
      isGovernanceControllable: boolean;
      0: string;
      1: string;
      2: string;
      3: number;
      4: boolean;
    }>;

    identityTransfer(
      _username: BytesLike,
      _newWallet: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    isKycApproved(
      _wallet: string,
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    isKycLevel1(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    kycDapp(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    nrtManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    /**
     * Returns the address of the current owner.
     */
    owner(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    prepaidEs(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    /**
     * This emits an event and admin can catch that and check it. And if ok then can approve it using a function
     */
    proposeKycDetails(
      _kycUnapprovedDetailsIPFS: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    randomnessManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    register(
      _newUsername: BytesLike,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(
      overrides?: CallOverrides
    ): Promise<{
      0: void;
    }>;

    resolveAddress(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    resolveUsername(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    resolveUsernameStrict(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    setIdentityOwner(
      _username: BytesLike,
      _newContract: string,
      _isGovernanceControllable: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setInitialValues(overrides?: Overrides): Promise<ContractTransaction>;

    setKycDapp(
      _kycDapp: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    timeallyClub(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    timeallyManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    timeallyPromotionalBucket(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    updateKycFee(
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    updateKycStatus(
      _username: BytesLike,
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      _kycStatus: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    usernames(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    validatorManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;
  };

  applyForKyc(
    _level: BigNumberish,
    _platformIdentifier: BytesLike,
    _specialization: BytesLike,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  approveKycDetails(
    _username: BytesLike,
    _kycUnapprovedDetailsIPFS: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  dayswappers(overrides?: CallOverrides): Promise<string>;

  getIdentityByAddress(
    _wallet: string,
    overrides?: CallOverrides
  ): Promise<{
    username: string;
    owner: string;
    kycApprovedDetailsIPFS: string;
    profileDetailsIPFS: string;
    level1: number;
    isGovernanceControllable: boolean;
    0: string;
    1: string;
    2: string;
    3: string;
    4: number;
    5: boolean;
  }>;

  getIdentityByUsername(
    _username: BytesLike,
    overrides?: CallOverrides
  ): Promise<{
    username: string;
    owner: string;
    kycApprovedDetailsIPFS: string;
    profileDetailsIPFS: string;
    level1: number;
    isGovernanceControllable: boolean;
    0: string;
    1: string;
    2: string;
    3: string;
    4: number;
    5: boolean;
  }>;

  getKycFee(
    _level: BigNumberish,
    _platformIdentifier: BytesLike,
    _specialization: BytesLike,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getKycStatusByAddress(
    _wallet: string,
    _level: BigNumberish,
    _platformIdentifier: BytesLike,
    _specialization: BytesLike,
    overrides?: CallOverrides
  ): Promise<number>;

  getKycStatusByUsername(
    _username: BytesLike,
    _level: BigNumberish,
    _platformIdentifier: BytesLike,
    _specialization: BytesLike,
    overrides?: CallOverrides
  ): Promise<number>;

  identities(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<{
    owner: string;
    kycApprovedDetailsIPFS: string;
    profileDetailsIPFS: string;
    level1: number;
    isGovernanceControllable: boolean;
    0: string;
    1: string;
    2: string;
    3: number;
    4: boolean;
  }>;

  identityTransfer(
    _username: BytesLike,
    _newWallet: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  isKycApproved(
    _wallet: string,
    _level: BigNumberish,
    _platformIdentifier: BytesLike,
    _specialization: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isKycLevel1(_wallet: string, overrides?: CallOverrides): Promise<boolean>;

  kycDapp(overrides?: CallOverrides): Promise<string>;

  nrtManager(overrides?: CallOverrides): Promise<string>;

  /**
   * Returns the address of the current owner.
   */
  owner(overrides?: CallOverrides): Promise<string>;

  prepaidEs(overrides?: CallOverrides): Promise<string>;

  /**
   * This emits an event and admin can catch that and check it. And if ok then can approve it using a function
   */
  proposeKycDetails(
    _kycUnapprovedDetailsIPFS: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  randomnessManager(overrides?: CallOverrides): Promise<string>;

  register(
    _newUsername: BytesLike,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  /**
   * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
   */
  renounceOwnership(overrides?: CallOverrides): Promise<void>;

  resolveAddress(
    _username: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  resolveUsername(_wallet: string, overrides?: CallOverrides): Promise<string>;

  resolveUsernameStrict(
    _wallet: string,
    overrides?: CallOverrides
  ): Promise<string>;

  setIdentityOwner(
    _username: BytesLike,
    _newContract: string,
    _isGovernanceControllable: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setInitialValues(overrides?: Overrides): Promise<ContractTransaction>;

  setKycDapp(
    _kycDapp: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  timeallyClub(overrides?: CallOverrides): Promise<string>;

  timeallyManager(overrides?: CallOverrides): Promise<string>;

  timeallyPromotionalBucket(overrides?: CallOverrides): Promise<string>;

  /**
   * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
   */
  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  updateKycFee(
    _level: BigNumberish,
    _platformIdentifier: BytesLike,
    _specialization: BytesLike,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  updateKycStatus(
    _username: BytesLike,
    _level: BigNumberish,
    _platformIdentifier: BytesLike,
    _specialization: BytesLike,
    _kycStatus: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  usernames(arg0: string, overrides?: CallOverrides): Promise<string>;

  validatorManager(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    applyForKyc(
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    approveKycDetails(
      _username: BytesLike,
      _kycUnapprovedDetailsIPFS: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    dayswappers(overrides?: CallOverrides): Promise<string>;

    getIdentityByAddress(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<{
      username: string;
      owner: string;
      kycApprovedDetailsIPFS: string;
      profileDetailsIPFS: string;
      level1: number;
      isGovernanceControllable: boolean;
      0: string;
      1: string;
      2: string;
      3: string;
      4: number;
      5: boolean;
    }>;

    getIdentityByUsername(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      username: string;
      owner: string;
      kycApprovedDetailsIPFS: string;
      profileDetailsIPFS: string;
      level1: number;
      isGovernanceControllable: boolean;
      0: string;
      1: string;
      2: string;
      3: string;
      4: number;
      5: boolean;
    }>;

    getKycFee(
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getKycStatusByAddress(
      _wallet: string,
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: CallOverrides
    ): Promise<number>;

    getKycStatusByUsername(
      _username: BytesLike,
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: CallOverrides
    ): Promise<number>;

    identities(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      owner: string;
      kycApprovedDetailsIPFS: string;
      profileDetailsIPFS: string;
      level1: number;
      isGovernanceControllable: boolean;
      0: string;
      1: string;
      2: string;
      3: number;
      4: boolean;
    }>;

    identityTransfer(
      _username: BytesLike,
      _newWallet: string,
      overrides?: CallOverrides
    ): Promise<void>;

    isKycApproved(
      _wallet: string,
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isKycLevel1(_wallet: string, overrides?: CallOverrides): Promise<boolean>;

    kycDapp(overrides?: CallOverrides): Promise<string>;

    nrtManager(overrides?: CallOverrides): Promise<string>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<string>;

    prepaidEs(overrides?: CallOverrides): Promise<string>;

    /**
     * This emits an event and admin can catch that and check it. And if ok then can approve it using a function
     */
    proposeKycDetails(
      _kycUnapprovedDetailsIPFS: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    randomnessManager(overrides?: CallOverrides): Promise<string>;

    register(_newUsername: BytesLike, overrides?: CallOverrides): Promise<void>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    resolveAddress(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    resolveUsername(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<string>;

    resolveUsernameStrict(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<string>;

    setIdentityOwner(
      _username: BytesLike,
      _newContract: string,
      _isGovernanceControllable: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setInitialValues(overrides?: CallOverrides): Promise<void>;

    setKycDapp(_kycDapp: string, overrides?: CallOverrides): Promise<void>;

    timeallyClub(overrides?: CallOverrides): Promise<string>;

    timeallyManager(overrides?: CallOverrides): Promise<string>;

    timeallyPromotionalBucket(overrides?: CallOverrides): Promise<string>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateKycFee(
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateKycStatus(
      _username: BytesLike,
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      _kycStatus: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    usernames(arg0: string, overrides?: CallOverrides): Promise<string>;

    validatorManager(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    IdentityTransfer(
      from: string | null,
      to: string | null,
      username: BytesLike | null
    ): EventFilter;

    KycApplied(
      username: BytesLike | null,
      level: BigNumberish | null,
      platformIdentifier: null,
      specialization: null
    ): EventFilter;

    KycDetailsUpdated(
      username: BytesLike | null,
      newKycDetailsIPfS: null
    ): EventFilter;

    KycFeeUpdated(
      level: BigNumberish | null,
      platformIdentifier: BytesLike | null,
      specialization: BytesLike | null,
      amount: null
    ): EventFilter;

    KycStatusUpdated(
      username: BytesLike | null,
      level: BigNumberish | null,
      platformIdentifier: null,
      specialization: null,
      newKycStatus: null
    ): EventFilter;

    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;

    ProfileDetailsUpdated(
      username: BytesLike | null,
      newProfileDetailsIPfS: null
    ): EventFilter;
  };

  estimateGas: {
    applyForKyc(
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    approveKycDetails(
      _username: BytesLike,
      _kycUnapprovedDetailsIPFS: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    dayswappers(overrides?: CallOverrides): Promise<BigNumber>;

    getIdentityByAddress(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getIdentityByUsername(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getKycFee(
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getKycStatusByAddress(
      _wallet: string,
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getKycStatusByUsername(
      _username: BytesLike,
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    identities(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    identityTransfer(
      _username: BytesLike,
      _newWallet: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    isKycApproved(
      _wallet: string,
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isKycLevel1(_wallet: string, overrides?: CallOverrides): Promise<BigNumber>;

    kycDapp(overrides?: CallOverrides): Promise<BigNumber>;

    nrtManager(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<BigNumber>;

    prepaidEs(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * This emits an event and admin can catch that and check it. And if ok then can approve it using a function
     */
    proposeKycDetails(
      _kycUnapprovedDetailsIPFS: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    randomnessManager(overrides?: CallOverrides): Promise<BigNumber>;

    register(
      _newUsername: BytesLike,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(overrides?: CallOverrides): Promise<BigNumber>;

    resolveAddress(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    resolveUsername(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    resolveUsernameStrict(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setIdentityOwner(
      _username: BytesLike,
      _newContract: string,
      _isGovernanceControllable: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setInitialValues(overrides?: Overrides): Promise<BigNumber>;

    setKycDapp(_kycDapp: string, overrides?: Overrides): Promise<BigNumber>;

    timeallyClub(overrides?: CallOverrides): Promise<BigNumber>;

    timeallyManager(overrides?: CallOverrides): Promise<BigNumber>;

    timeallyPromotionalBucket(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    updateKycFee(
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    updateKycStatus(
      _username: BytesLike,
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      _kycStatus: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    usernames(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    validatorManager(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    applyForKyc(
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    approveKycDetails(
      _username: BytesLike,
      _kycUnapprovedDetailsIPFS: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    dayswappers(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getIdentityByAddress(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getIdentityByUsername(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getKycFee(
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getKycStatusByAddress(
      _wallet: string,
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getKycStatusByUsername(
      _username: BytesLike,
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    identities(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    identityTransfer(
      _username: BytesLike,
      _newWallet: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    isKycApproved(
      _wallet: string,
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isKycLevel1(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    kycDapp(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nrtManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    prepaidEs(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * This emits an event and admin can catch that and check it. And if ok then can approve it using a function
     */
    proposeKycDetails(
      _kycUnapprovedDetailsIPFS: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    randomnessManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    register(
      _newUsername: BytesLike,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    resolveAddress(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    resolveUsername(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    resolveUsernameStrict(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setIdentityOwner(
      _username: BytesLike,
      _newContract: string,
      _isGovernanceControllable: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setInitialValues(overrides?: Overrides): Promise<PopulatedTransaction>;

    setKycDapp(
      _kycDapp: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    timeallyClub(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    timeallyManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    timeallyPromotionalBucket(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    updateKycFee(
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    updateKycStatus(
      _username: BytesLike,
      _level: BigNumberish,
      _platformIdentifier: BytesLike,
      _specialization: BytesLike,
      _kycStatus: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    usernames(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    validatorManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}

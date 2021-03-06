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

interface NrtManagerInterface extends ethers.utils.Interface {
  functions: {
    "BURN_ADDR()": FunctionFragment;
    "SECONDS_IN_MONTH()": FunctionFragment;
    "addToBurnPool()": FunctionFragment;
    "addToLuckPool()": FunctionFragment;
    "annualNRT()": FunctionFragment;
    "burnPoolBalance()": FunctionFragment;
    "currentNrtMonth()": FunctionFragment;
    "dayswappers()": FunctionFragment;
    "getBurnAmount()": FunctionFragment;
    "getPerThousand(uint256)": FunctionFragment;
    "getPerThousands()": FunctionFragment;
    "getPlatform(uint256)": FunctionFragment;
    "getPlatformDetails()": FunctionFragment;
    "getPlatforms()": FunctionFragment;
    "isAdminMode()": FunctionFragment;
    "kycDapp()": FunctionFragment;
    "lastReleaseTimestamp()": FunctionFragment;
    "luckPoolBalance()": FunctionFragment;
    "nrtManager()": FunctionFragment;
    "owner()": FunctionFragment;
    "prepaidEs()": FunctionFragment;
    "randomnessManager()": FunctionFragment;
    "releaseMonthlyNRT()": FunctionFragment;
    "renounceAdminMode()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "resolveAddress(bytes32)": FunctionFragment;
    "resolveUsername(address)": FunctionFragment;
    "resolveUsernameStrict(address)": FunctionFragment;
    "setKycDapp(address)": FunctionFragment;
    "setPlatforms(bytes32[],uint256[])": FunctionFragment;
    "timeallyClub()": FunctionFragment;
    "timeallyManager()": FunctionFragment;
    "timeallyPromotionalBucket()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "validatorManager()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "BURN_ADDR", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "SECONDS_IN_MONTH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addToBurnPool",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addToLuckPool",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "annualNRT", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "burnPoolBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "currentNrtMonth",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "dayswappers",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBurnAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPerThousand",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPerThousands",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPlatform",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPlatformDetails",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPlatforms",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isAdminMode",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "kycDapp", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "lastReleaseTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "luckPoolBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nrtManager",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "prepaidEs", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "randomnessManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "releaseMonthlyNRT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceAdminMode",
    values?: undefined
  ): string;
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
  encodeFunctionData(functionFragment: "setKycDapp", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setPlatforms",
    values: [BytesLike[], BigNumberish[]]
  ): string;
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
    functionFragment: "validatorManager",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "BURN_ADDR", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "SECONDS_IN_MONTH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addToBurnPool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addToLuckPool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "annualNRT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "burnPoolBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentNrtMonth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dayswappers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBurnAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPerThousand",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPerThousands",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPlatform",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPlatformDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPlatforms",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isAdminMode",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "kycDapp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lastReleaseTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "luckPoolBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nrtManager", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "prepaidEs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "randomnessManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "releaseMonthlyNRT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceAdminMode",
    data: BytesLike
  ): Result;
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
  decodeFunctionResult(functionFragment: "setKycDapp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setPlatforms",
    data: BytesLike
  ): Result;
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
    functionFragment: "validatorManager",
    data: BytesLike
  ): Result;

  events: {
    "AddressM(address,string)": EventFragment;
    "AddressM2(bytes32,string)": EventFragment;
    "Bool(bool)": EventFragment;
    "Burn(uint32,uint256)": EventFragment;
    "BurnPoolAccrue(uint32,uint256,address)": EventFragment;
    "LuckPoolAccrue(uint32,uint256,address)": EventFragment;
    "NRT(uint32,uint256,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddressM"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AddressM2"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Bool"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Burn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BurnPoolAccrue"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LuckPoolAccrue"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NRT"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export class NrtManager extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: NrtManagerInterface;

  functions: {
    /**
     * A destination for tokens which are destined to be unspendable forever.
     */
    BURN_ADDR(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    SECONDS_IN_MONTH(
      overrides?: CallOverrides
    ): Promise<{
      0: number;
    }>;

    /**
     * Adds tokens to burn pool.
     */
    addToBurnPool(overrides?: PayableOverrides): Promise<ContractTransaction>;

    /**
     * Adds tokens to luck pool.
     */
    addToLuckPool(overrides?: PayableOverrides): Promise<ContractTransaction>;

    /**
     * Annual amount which is released monthly during first year. On end         of a year, this amount decreases by 10%.
     */
    annualNRT(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    /**
     * Amount of tokens accrued for burning as per Era Swap Whitepaper.
     */
    burnPoolBalance(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    /**
     * Number of NRT releases that have been happened.
     */
    currentNrtMonth(
      overrides?: CallOverrides
    ): Promise<{
      0: number;
    }>;

    dayswappers(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    /**
     * Gets tokens allowed to be burned during upcoming NRT.
     */
    getBurnAmount(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    /**
     * Gets NRT share of a platform.
     * @param _perThousandIndex : Index of platform.
     */
    getPerThousand(
      _perThousandIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    /**
     * Gets all nrt shares of platforms.
     */
    getPerThousands(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber[];
    }>;

    /**
     * Gets platform address by index.
     * @param _platformIndex : Index of platform.
     */
    getPlatform(
      _platformIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    /**
     * Gets platforms and their NRT share.
     */
    getPlatformDetails(
      overrides?: CallOverrides
    ): Promise<{
      0: string[];
      1: BigNumber[];
    }>;

    /**
     * Gets all platform addresses.
     */
    getPlatforms(
      overrides?: CallOverrides
    ): Promise<{
      0: string[];
    }>;

    isAdminMode(
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    kycDapp(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    /**
     * Timestamp of the block in which last NRT transaction was sealed.
     */
    lastReleaseTimestamp(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    /**
     * Amount of tokens accrued for the month by luck as per Era Swap Whitepaper.
     */
    luckPoolBalance(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
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

    randomnessManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    /**
     * Sends NRT share to the platforms and burns tokens from burn pool as per Era Swap Whitepaper.
     */
    releaseMonthlyNRT(overrides?: Overrides): Promise<ContractTransaction>;

    renounceAdminMode(overrides?: Overrides): Promise<ContractTransaction>;

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

    setKycDapp(
      _kycDapp: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    /**
     * Sets initial enviornment values.
     * @param _perThousands : Corresponding perThousand NRT share.
     * @param _platformIdentifiers : Addresses of platform smart contracts or wallets.
     */
    setPlatforms(
      _platformIdentifiers: BytesLike[],
      _perThousands: BigNumberish[],
      overrides?: PayableOverrides
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

    validatorManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;
  };

  /**
   * A destination for tokens which are destined to be unspendable forever.
   */
  BURN_ADDR(overrides?: CallOverrides): Promise<string>;

  SECONDS_IN_MONTH(overrides?: CallOverrides): Promise<number>;

  /**
   * Adds tokens to burn pool.
   */
  addToBurnPool(overrides?: PayableOverrides): Promise<ContractTransaction>;

  /**
   * Adds tokens to luck pool.
   */
  addToLuckPool(overrides?: PayableOverrides): Promise<ContractTransaction>;

  /**
   * Annual amount which is released monthly during first year. On end         of a year, this amount decreases by 10%.
   */
  annualNRT(overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * Amount of tokens accrued for burning as per Era Swap Whitepaper.
   */
  burnPoolBalance(overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * Number of NRT releases that have been happened.
   */
  currentNrtMonth(overrides?: CallOverrides): Promise<number>;

  dayswappers(overrides?: CallOverrides): Promise<string>;

  /**
   * Gets tokens allowed to be burned during upcoming NRT.
   */
  getBurnAmount(overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * Gets NRT share of a platform.
   * @param _perThousandIndex : Index of platform.
   */
  getPerThousand(
    _perThousandIndex: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  /**
   * Gets all nrt shares of platforms.
   */
  getPerThousands(overrides?: CallOverrides): Promise<BigNumber[]>;

  /**
   * Gets platform address by index.
   * @param _platformIndex : Index of platform.
   */
  getPlatform(
    _platformIndex: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  /**
   * Gets platforms and their NRT share.
   */
  getPlatformDetails(
    overrides?: CallOverrides
  ): Promise<{
    0: string[];
    1: BigNumber[];
  }>;

  /**
   * Gets all platform addresses.
   */
  getPlatforms(overrides?: CallOverrides): Promise<string[]>;

  isAdminMode(overrides?: CallOverrides): Promise<boolean>;

  kycDapp(overrides?: CallOverrides): Promise<string>;

  /**
   * Timestamp of the block in which last NRT transaction was sealed.
   */
  lastReleaseTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * Amount of tokens accrued for the month by luck as per Era Swap Whitepaper.
   */
  luckPoolBalance(overrides?: CallOverrides): Promise<BigNumber>;

  nrtManager(overrides?: CallOverrides): Promise<string>;

  /**
   * Returns the address of the current owner.
   */
  owner(overrides?: CallOverrides): Promise<string>;

  prepaidEs(overrides?: CallOverrides): Promise<string>;

  randomnessManager(overrides?: CallOverrides): Promise<string>;

  /**
   * Sends NRT share to the platforms and burns tokens from burn pool as per Era Swap Whitepaper.
   */
  releaseMonthlyNRT(overrides?: Overrides): Promise<ContractTransaction>;

  renounceAdminMode(overrides?: Overrides): Promise<ContractTransaction>;

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

  setKycDapp(
    _kycDapp: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  /**
   * Sets initial enviornment values.
   * @param _perThousands : Corresponding perThousand NRT share.
   * @param _platformIdentifiers : Addresses of platform smart contracts or wallets.
   */
  setPlatforms(
    _platformIdentifiers: BytesLike[],
    _perThousands: BigNumberish[],
    overrides?: PayableOverrides
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

  validatorManager(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    /**
     * A destination for tokens which are destined to be unspendable forever.
     */
    BURN_ADDR(overrides?: CallOverrides): Promise<string>;

    SECONDS_IN_MONTH(overrides?: CallOverrides): Promise<number>;

    /**
     * Adds tokens to burn pool.
     */
    addToBurnPool(overrides?: CallOverrides): Promise<void>;

    /**
     * Adds tokens to luck pool.
     */
    addToLuckPool(overrides?: CallOverrides): Promise<void>;

    /**
     * Annual amount which is released monthly during first year. On end         of a year, this amount decreases by 10%.
     */
    annualNRT(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Amount of tokens accrued for burning as per Era Swap Whitepaper.
     */
    burnPoolBalance(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Number of NRT releases that have been happened.
     */
    currentNrtMonth(overrides?: CallOverrides): Promise<number>;

    dayswappers(overrides?: CallOverrides): Promise<string>;

    /**
     * Gets tokens allowed to be burned during upcoming NRT.
     */
    getBurnAmount(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Gets NRT share of a platform.
     * @param _perThousandIndex : Index of platform.
     */
    getPerThousand(
      _perThousandIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * Gets all nrt shares of platforms.
     */
    getPerThousands(overrides?: CallOverrides): Promise<BigNumber[]>;

    /**
     * Gets platform address by index.
     * @param _platformIndex : Index of platform.
     */
    getPlatform(
      _platformIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    /**
     * Gets platforms and their NRT share.
     */
    getPlatformDetails(
      overrides?: CallOverrides
    ): Promise<{
      0: string[];
      1: BigNumber[];
    }>;

    /**
     * Gets all platform addresses.
     */
    getPlatforms(overrides?: CallOverrides): Promise<string[]>;

    isAdminMode(overrides?: CallOverrides): Promise<boolean>;

    kycDapp(overrides?: CallOverrides): Promise<string>;

    /**
     * Timestamp of the block in which last NRT transaction was sealed.
     */
    lastReleaseTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Amount of tokens accrued for the month by luck as per Era Swap Whitepaper.
     */
    luckPoolBalance(overrides?: CallOverrides): Promise<BigNumber>;

    nrtManager(overrides?: CallOverrides): Promise<string>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<string>;

    prepaidEs(overrides?: CallOverrides): Promise<string>;

    randomnessManager(overrides?: CallOverrides): Promise<string>;

    /**
     * Sends NRT share to the platforms and burns tokens from burn pool as per Era Swap Whitepaper.
     */
    releaseMonthlyNRT(overrides?: CallOverrides): Promise<void>;

    renounceAdminMode(overrides?: CallOverrides): Promise<void>;

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

    setKycDapp(_kycDapp: string, overrides?: CallOverrides): Promise<void>;

    /**
     * Sets initial enviornment values.
     * @param _perThousands : Corresponding perThousand NRT share.
     * @param _platformIdentifiers : Addresses of platform smart contracts or wallets.
     */
    setPlatforms(
      _platformIdentifiers: BytesLike[],
      _perThousands: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

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

    validatorManager(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    AddressM(a: null, m: null): EventFilter;

    AddressM2(a: null, m: null): EventFilter;

    Bool(b: null): EventFilter;

    Burn(nrtMonth: BigNumberish | null, value: null): EventFilter;

    BurnPoolAccrue(
      nrtMonth: BigNumberish | null,
      value: null,
      sender: null
    ): EventFilter;

    LuckPoolAccrue(
      nrtMonth: BigNumberish | null,
      value: null,
      sender: null
    ): EventFilter;

    NRT(
      nrtMonth: BigNumberish | null,
      value: null,
      releaser: null
    ): EventFilter;

    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;
  };

  estimateGas: {
    /**
     * A destination for tokens which are destined to be unspendable forever.
     */
    BURN_ADDR(overrides?: CallOverrides): Promise<BigNumber>;

    SECONDS_IN_MONTH(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Adds tokens to burn pool.
     */
    addToBurnPool(overrides?: PayableOverrides): Promise<BigNumber>;

    /**
     * Adds tokens to luck pool.
     */
    addToLuckPool(overrides?: PayableOverrides): Promise<BigNumber>;

    /**
     * Annual amount which is released monthly during first year. On end         of a year, this amount decreases by 10%.
     */
    annualNRT(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Amount of tokens accrued for burning as per Era Swap Whitepaper.
     */
    burnPoolBalance(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Number of NRT releases that have been happened.
     */
    currentNrtMonth(overrides?: CallOverrides): Promise<BigNumber>;

    dayswappers(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Gets tokens allowed to be burned during upcoming NRT.
     */
    getBurnAmount(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Gets NRT share of a platform.
     * @param _perThousandIndex : Index of platform.
     */
    getPerThousand(
      _perThousandIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * Gets all nrt shares of platforms.
     */
    getPerThousands(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Gets platform address by index.
     * @param _platformIndex : Index of platform.
     */
    getPlatform(
      _platformIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * Gets platforms and their NRT share.
     */
    getPlatformDetails(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Gets all platform addresses.
     */
    getPlatforms(overrides?: CallOverrides): Promise<BigNumber>;

    isAdminMode(overrides?: CallOverrides): Promise<BigNumber>;

    kycDapp(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Timestamp of the block in which last NRT transaction was sealed.
     */
    lastReleaseTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Amount of tokens accrued for the month by luck as per Era Swap Whitepaper.
     */
    luckPoolBalance(overrides?: CallOverrides): Promise<BigNumber>;

    nrtManager(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<BigNumber>;

    prepaidEs(overrides?: CallOverrides): Promise<BigNumber>;

    randomnessManager(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Sends NRT share to the platforms and burns tokens from burn pool as per Era Swap Whitepaper.
     */
    releaseMonthlyNRT(overrides?: Overrides): Promise<BigNumber>;

    renounceAdminMode(overrides?: Overrides): Promise<BigNumber>;

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

    setKycDapp(_kycDapp: string, overrides?: Overrides): Promise<BigNumber>;

    /**
     * Sets initial enviornment values.
     * @param _perThousands : Corresponding perThousand NRT share.
     * @param _platformIdentifiers : Addresses of platform smart contracts or wallets.
     */
    setPlatforms(
      _platformIdentifiers: BytesLike[],
      _perThousands: BigNumberish[],
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

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

    validatorManager(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    /**
     * A destination for tokens which are destined to be unspendable forever.
     */
    BURN_ADDR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SECONDS_IN_MONTH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Adds tokens to burn pool.
     */
    addToBurnPool(overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    /**
     * Adds tokens to luck pool.
     */
    addToLuckPool(overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    /**
     * Annual amount which is released monthly during first year. On end         of a year, this amount decreases by 10%.
     */
    annualNRT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Amount of tokens accrued for burning as per Era Swap Whitepaper.
     */
    burnPoolBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Number of NRT releases that have been happened.
     */
    currentNrtMonth(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    dayswappers(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Gets tokens allowed to be burned during upcoming NRT.
     */
    getBurnAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Gets NRT share of a platform.
     * @param _perThousandIndex : Index of platform.
     */
    getPerThousand(
      _perThousandIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Gets all nrt shares of platforms.
     */
    getPerThousands(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Gets platform address by index.
     * @param _platformIndex : Index of platform.
     */
    getPlatform(
      _platformIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Gets platforms and their NRT share.
     */
    getPlatformDetails(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Gets all platform addresses.
     */
    getPlatforms(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isAdminMode(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    kycDapp(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Timestamp of the block in which last NRT transaction was sealed.
     */
    lastReleaseTimestamp(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Amount of tokens accrued for the month by luck as per Era Swap Whitepaper.
     */
    luckPoolBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nrtManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    prepaidEs(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    randomnessManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Sends NRT share to the platforms and burns tokens from burn pool as per Era Swap Whitepaper.
     */
    releaseMonthlyNRT(overrides?: Overrides): Promise<PopulatedTransaction>;

    renounceAdminMode(overrides?: Overrides): Promise<PopulatedTransaction>;

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

    setKycDapp(
      _kycDapp: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    /**
     * Sets initial enviornment values.
     * @param _perThousands : Corresponding perThousand NRT share.
     * @param _platformIdentifiers : Addresses of platform smart contracts or wallets.
     */
    setPlatforms(
      _platformIdentifiers: BytesLike[],
      _perThousands: BigNumberish[],
      overrides?: PayableOverrides
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

    validatorManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}

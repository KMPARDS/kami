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
  CallOverrides
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface ITimeAllyPromotionalBucketInterface extends ethers.utils.Interface {
  functions: {
    "claimReward(address)": FunctionFragment;
    "rewardToStaker(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "claimReward", values: [string]): string;
  encodeFunctionData(
    functionFragment: "rewardToStaker",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "claimReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardToStaker",
    data: BytesLike
  ): Result;

  events: {};
}

export class ITimeAllyPromotionalBucket extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: ITimeAllyPromotionalBucketInterface;

  functions: {
    claimReward(
      stakingContract: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    rewardToStaker(
      _wallet: string,
      _stakingReward: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  claimReward(
    stakingContract: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  rewardToStaker(
    _wallet: string,
    _stakingReward: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    claimReward(
      stakingContract: string,
      overrides?: CallOverrides
    ): Promise<void>;

    rewardToStaker(
      _wallet: string,
      _stakingReward: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    claimReward(
      stakingContract: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    rewardToStaker(
      _wallet: string,
      _stakingReward: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    claimReward(
      stakingContract: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    rewardToStaker(
      _wallet: string,
      _stakingReward: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}

/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers';
import { Contract, ContractTransaction, Overrides, CallOverrides } from '@ethersproject/contracts';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi';

interface TimeAllyStakingInterface extends ethers.utils.Interface {
  functions: {
    'delegate(address,address,uint256,uint256[])': FunctionFragment;
    'getDelegation(uint256,uint256)': FunctionFragment;
    'getDelegations(uint256)': FunctionFragment;
    'getPrincipalAmount(uint256)': FunctionFragment;
    'isMonthClaimed(uint256)': FunctionFragment;
    'nrtManager()': FunctionFragment;
    'staker()': FunctionFragment;
    'stakingEndMonth()': FunctionFragment;
    'stakingPlanId()': FunctionFragment;
    'stakingStartMonth()': FunctionFragment;
    'timeAllyManager()': FunctionFragment;
    'timestamp()': FunctionFragment;
    'unboundedBasicAmount()': FunctionFragment;
    'validatorManager()': FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: 'delegate',
    values: [string, string, BigNumberish, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: 'getDelegation',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'getDelegations', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getPrincipalAmount', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'isMonthClaimed', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'nrtManager', values?: undefined): string;
  encodeFunctionData(functionFragment: 'staker', values?: undefined): string;
  encodeFunctionData(functionFragment: 'stakingEndMonth', values?: undefined): string;
  encodeFunctionData(functionFragment: 'stakingPlanId', values?: undefined): string;
  encodeFunctionData(functionFragment: 'stakingStartMonth', values?: undefined): string;
  encodeFunctionData(functionFragment: 'timeAllyManager', values?: undefined): string;
  encodeFunctionData(functionFragment: 'timestamp', values?: undefined): string;
  encodeFunctionData(functionFragment: 'unboundedBasicAmount', values?: undefined): string;
  encodeFunctionData(functionFragment: 'validatorManager', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'delegate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getDelegation', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getDelegations', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPrincipalAmount', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isMonthClaimed', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nrtManager', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'staker', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'stakingEndMonth', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'stakingPlanId', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'stakingStartMonth', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'timeAllyManager', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'timestamp', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'unboundedBasicAmount', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'validatorManager', data: BytesLike): Result;

  events: {};
}

export class TimeAllyStaking extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: TimeAllyStakingInterface;

  functions: {
    delegate(
      _platform: string,
      _delegatee: string,
      _amount: BigNumberish,
      _months: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getDelegation(
      _month: BigNumberish,
      _delegationIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: {
        platform: string;
        delegatee: string;
        amount: BigNumber;
        0: string;
        1: string;
        2: BigNumber;
      };
    }>;

    getDelegations(
      _month: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: {
        platform: string;
        delegatee: string;
        amount: BigNumber;
        0: string;
        1: string;
        2: BigNumber;
      }[];
    }>;

    getPrincipalAmount(
      _month: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    isMonthClaimed(
      _month: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    nrtManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    staker(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    stakingEndMonth(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    stakingPlanId(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    stakingStartMonth(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    timeAllyManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    timestamp(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    unboundedBasicAmount(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    validatorManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;
  };

  delegate(
    _platform: string,
    _delegatee: string,
    _amount: BigNumberish,
    _months: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getDelegation(
    _month: BigNumberish,
    _delegationIndex: BigNumberish,
    overrides?: CallOverrides
  ): Promise<{
    platform: string;
    delegatee: string;
    amount: BigNumber;
    0: string;
    1: string;
    2: BigNumber;
  }>;

  getDelegations(
    _month: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    {
      platform: string;
      delegatee: string;
      amount: BigNumber;
      0: string;
      1: string;
      2: BigNumber;
    }[]
  >;

  getPrincipalAmount(_month: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  isMonthClaimed(_month: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  nrtManager(overrides?: CallOverrides): Promise<string>;

  staker(overrides?: CallOverrides): Promise<string>;

  stakingEndMonth(overrides?: CallOverrides): Promise<BigNumber>;

  stakingPlanId(overrides?: CallOverrides): Promise<BigNumber>;

  stakingStartMonth(overrides?: CallOverrides): Promise<BigNumber>;

  timeAllyManager(overrides?: CallOverrides): Promise<string>;

  timestamp(overrides?: CallOverrides): Promise<BigNumber>;

  unboundedBasicAmount(overrides?: CallOverrides): Promise<BigNumber>;

  validatorManager(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    delegate(
      _platform: string,
      _delegatee: string,
      _amount: BigNumberish,
      _months: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    getDelegation(
      _month: BigNumberish,
      _delegationIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      platform: string;
      delegatee: string;
      amount: BigNumber;
      0: string;
      1: string;
      2: BigNumber;
    }>;

    getDelegations(
      _month: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      {
        platform: string;
        delegatee: string;
        amount: BigNumber;
        0: string;
        1: string;
        2: BigNumber;
      }[]
    >;

    getPrincipalAmount(_month: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    isMonthClaimed(_month: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    nrtManager(overrides?: CallOverrides): Promise<string>;

    staker(overrides?: CallOverrides): Promise<string>;

    stakingEndMonth(overrides?: CallOverrides): Promise<BigNumber>;

    stakingPlanId(overrides?: CallOverrides): Promise<BigNumber>;

    stakingStartMonth(overrides?: CallOverrides): Promise<BigNumber>;

    timeAllyManager(overrides?: CallOverrides): Promise<string>;

    timestamp(overrides?: CallOverrides): Promise<BigNumber>;

    unboundedBasicAmount(overrides?: CallOverrides): Promise<BigNumber>;

    validatorManager(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    delegate(
      _platform: string,
      _delegatee: string,
      _amount: BigNumberish,
      _months: BigNumberish[]
    ): Promise<BigNumber>;
    getDelegation(_month: BigNumberish, _delegationIndex: BigNumberish): Promise<BigNumber>;
    getDelegations(_month: BigNumberish): Promise<BigNumber>;
    getPrincipalAmount(_month: BigNumberish): Promise<BigNumber>;
    isMonthClaimed(_month: BigNumberish): Promise<BigNumber>;
    nrtManager(): Promise<BigNumber>;
    staker(): Promise<BigNumber>;
    stakingEndMonth(): Promise<BigNumber>;
    stakingPlanId(): Promise<BigNumber>;
    stakingStartMonth(): Promise<BigNumber>;
    timeAllyManager(): Promise<BigNumber>;
    timestamp(): Promise<BigNumber>;
    unboundedBasicAmount(): Promise<BigNumber>;
    validatorManager(): Promise<BigNumber>;
  };

  populateTransaction: {
    delegate(
      _platform: string,
      _delegatee: string,
      _amount: BigNumberish,
      _months: BigNumberish[]
    ): Promise<PopulatedTransaction>;
    getDelegation(
      _month: BigNumberish,
      _delegationIndex: BigNumberish
    ): Promise<PopulatedTransaction>;
    getDelegations(_month: BigNumberish): Promise<PopulatedTransaction>;
    getPrincipalAmount(_month: BigNumberish): Promise<PopulatedTransaction>;
    isMonthClaimed(_month: BigNumberish): Promise<PopulatedTransaction>;
    nrtManager(): Promise<PopulatedTransaction>;
    staker(): Promise<PopulatedTransaction>;
    stakingEndMonth(): Promise<PopulatedTransaction>;
    stakingPlanId(): Promise<PopulatedTransaction>;
    stakingStartMonth(): Promise<PopulatedTransaction>;
    timeAllyManager(): Promise<PopulatedTransaction>;
    timestamp(): Promise<PopulatedTransaction>;
    unboundedBasicAmount(): Promise<PopulatedTransaction>;
    validatorManager(): Promise<PopulatedTransaction>;
  };
}

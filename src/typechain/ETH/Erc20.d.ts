/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers';
import { Contract, ContractTransaction, Overrides, CallOverrides } from '@ethersproject/contracts';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import { FunctionFragment, EventFragment } from '@ethersproject/abi';

interface Erc20Interface extends ethers.utils.Interface {
  functions: {
    'allowance(address,address)': FunctionFragment;
    'approve(address,uint256)': FunctionFragment;
    'balanceOf(address)': FunctionFragment;
    'decimals()': FunctionFragment;
    'name()': FunctionFragment;
    'symbol()': FunctionFragment;
    'totalSupply()': FunctionFragment;
    'transfer(address,uint256)': FunctionFragment;
    'transferFrom(address,address,uint256)': FunctionFragment;
  };

  events: {
    'Approval(address,address,uint256)': EventFragment;
    'Transfer(address,address,uint256)': EventFragment;
  };
}

export class Erc20 extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: Erc20Interface;

  functions: {
    allowance(
      owner: string,
      delegate: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    approve(
      delegate: string,
      numTokens: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    balanceOf(
      tokenOwner: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    decimals(
      overrides?: CallOverrides
    ): Promise<{
      0: number;
    }>;

    name(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    symbol(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    totalSupply(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    transfer(
      receiver: string,
      numTokens: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    transferFrom(
      owner: string,
      buyer: string,
      numTokens: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  allowance(owner: string, delegate: string, overrides?: CallOverrides): Promise<BigNumber>;

  approve(
    delegate: string,
    numTokens: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  balanceOf(tokenOwner: string, overrides?: CallOverrides): Promise<BigNumber>;

  decimals(overrides?: CallOverrides): Promise<number>;

  name(overrides?: CallOverrides): Promise<string>;

  symbol(overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    receiver: string,
    numTokens: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  transferFrom(
    owner: string,
    buyer: string,
    numTokens: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  filters: {
    Approval(tokenOwner: string | null, spender: string | null, tokens: null): EventFilter;

    Transfer(from: string | null, to: string | null, tokens: null): EventFilter;
  };

  estimateGas: {
    allowance(owner: string, delegate: string): Promise<BigNumber>;
    approve(delegate: string, numTokens: BigNumberish): Promise<BigNumber>;
    balanceOf(tokenOwner: string): Promise<BigNumber>;
    decimals(): Promise<BigNumber>;
    name(): Promise<BigNumber>;
    symbol(): Promise<BigNumber>;
    totalSupply(): Promise<BigNumber>;
    transfer(receiver: string, numTokens: BigNumberish): Promise<BigNumber>;
    transferFrom(owner: string, buyer: string, numTokens: BigNumberish): Promise<BigNumber>;
  };

  populateTransaction: {
    allowance(owner: string, delegate: string): Promise<PopulatedTransaction>;
    approve(delegate: string, numTokens: BigNumberish): Promise<PopulatedTransaction>;
    balanceOf(tokenOwner: string): Promise<PopulatedTransaction>;
    decimals(): Promise<PopulatedTransaction>;
    name(): Promise<PopulatedTransaction>;
    symbol(): Promise<PopulatedTransaction>;
    totalSupply(): Promise<PopulatedTransaction>;
    transfer(receiver: string, numTokens: BigNumberish): Promise<PopulatedTransaction>;
    transferFrom(
      owner: string,
      buyer: string,
      numTokens: BigNumberish
    ): Promise<PopulatedTransaction>;
  };
}
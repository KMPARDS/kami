/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers';
import { Contract, ContractTransaction, Overrides } from '@ethersproject/contracts';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi';

interface RandomnessManagerInterface extends ethers.utils.Interface {
  functions: {
    'getRandomBytes(uint256)': FunctionFragment;
    'getRandomBytes32()': FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'getRandomBytes', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getRandomBytes32', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'getRandomBytes', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getRandomBytes32', data: BytesLike): Result;

  events: {};
}

export class RandomnessManager extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: RandomnessManagerInterface;

  functions: {
    getRandomBytes(
      _numberOfBytes: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getRandomBytes32(overrides?: Overrides): Promise<ContractTransaction>;
  };

  getRandomBytes(_numberOfBytes: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>;

  getRandomBytes32(overrides?: Overrides): Promise<ContractTransaction>;

  callStatic: {
    getRandomBytes(_numberOfBytes: BigNumberish, overrides?: CallOverrides): Promise<string>;

    getRandomBytes32(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    getRandomBytes(_numberOfBytes: BigNumberish, overrides?: Overrides): Promise<BigNumber>;

    getRandomBytes32(overrides?: Overrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getRandomBytes(
      _numberOfBytes: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getRandomBytes32(overrides?: Overrides): Promise<PopulatedTransaction>;
  };
}
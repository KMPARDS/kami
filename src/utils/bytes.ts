import assert from 'assert';
import { ethers } from 'ethers';
import { t, validate, validateMultiple } from '../type-validation';

export interface Byted {
  data: Uint8Array;
  length: number;
  hex(): string;
  number(): number | never;
  concat(byted: Byted): Bytes;
  toBytes32(): Bytes32;
  eq(byted: Byted): boolean;
}

export class Bytes implements Byted {
  data: Uint8Array;

  constructor(data: string | Uint8Array | number, length?: number) {
    validateMultiple(data, [t.uint8array, t.uint, t.hex]);
    if (length) validate(length, t.uint);

    if (typeof data === 'string') {
      this.data = ethers.utils.arrayify(data);
    } else if (typeof data === 'number') {
      let hexed = data.toString(16);
      if (hexed.length % 2) hexed = '0' + hexed;
      if (length) {
        hexed = ethers.utils.hexZeroPad('0x' + hexed, length);
      } else {
        hexed = '0x' + hexed;
      }
      this.data = ethers.utils.arrayify(hexed);
    } else {
      this.data = data;
    }

    if (length) {
      if (this.data.length !== length) {
        throw new Error(
          `Input should be of ${length} bytes but it is ${this.data.length} bytes`
        );
      }
    }
  }

  get length(): number {
    return this.data.length;
  }

  hex(): string {
    return ethers.utils.hexlify(this.data);
  }

  number(): number | never {
    assert.ok(
      this.data.length <= 4,
      'Converting Bytes to Number resulted in overflow'
    );
    return +this.hex();
  }

  concat(byted: Byted): Bytes {
    validate(byted, t.byted);
    return new Bytes(ethers.utils.concat([this.data, byted.data]));
  }

  toBytes32(): Bytes32 {
    return new Bytes32(this.data);
  }

  eq(byted: Byted): boolean {
    if (this.length !== byted.length) {
      return false;
    }

    let result = true;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] !== byted.data[i]) {
        result = false;
        // below line is commented by purpose to prevent any related side channel timing attacks
        // break;
      }
    }
    return result;
  }

  slice(start?: number | undefined, end?: number | undefined): Bytes {
    const sliced = this.data.slice(start, end);
    return new Bytes(sliced);
  }
}

export class Address extends Bytes {
  constructor(data: string | Uint8Array) {
    super(data, 20);
  }
}

export class Bytes32 extends Bytes {
  constructor(data: string | Uint8Array) {
    super(data, 32);
  }
}

export class Bytes1 extends Bytes {
  constructor(data: string | Uint8Array | number) {
    super(data, 1);
  }
}

export class Signature extends Bytes {
  constructor(data: string | Uint8Array) {
    const sig = ethers.utils.splitSignature(new Bytes(data, 65).data);
    if (sig.v === undefined && sig.recoveryParam === undefined) {
      assert(false, 'There should be v or recoveryParam');
    }

    super(data, 65);
  }

  get r(): Bytes32 {
    const sig = ethers.utils.splitSignature(this.data);
    return new Bytes32(sig.r);
  }
  get s(): Bytes32 {
    const sig = ethers.utils.splitSignature(this.data);
    return new Bytes32(sig.s);
  }
  get v(): Bytes1 {
    const sig = ethers.utils.splitSignature(this.data);
    return new Bytes1(sig.v ?? (sig.recoveryParam ?? 0) + 27);
  }
}

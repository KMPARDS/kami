import assert from 'assert';
import { ethers } from 'ethers';
import { t, validate, validateMultiple } from '../type-validation';

export interface Byted {
  data: Uint8Array;
  length: number;
  hex(): string;
  number(): number | never;
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
      this.data = ethers.utils.arrayify('0x' + hexed);
    } else {
      this.data = data;
    }

    if (length) {
      assert.equal(
        this.data.length,
        length,
        `Input should be of ${length} bytes`
      );
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

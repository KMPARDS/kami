import assert from 'assert';
import { ethers } from 'ethers';
import { t, check, validate, validateMultiple } from '../type-validation';

export interface Byted {
  data: Uint8Array;
  hex(): string;
  number(): number;
}

export class Bytes {
  data: Uint8Array;

  constructor(data: string | Uint8Array, length?: number) {
    validateMultiple(data, [t.uint8array, t.hex]);
    if (length) validate(length, t.uint);

    this.data = typeof data === 'string' ? ethers.utils.arrayify(data) : data;

    if (length) {
      assert.equal(
        this.data.length,
        length,
        `Input should be of ${length} bytes`
      );
    }
  }

  hex(): string {
    return ethers.utils.hexlify(this.data);
  }

  number(): number {
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
    if (typeof data === 'number') {
      validate(data, t.uint8);
      data = new Uint8Array([data]);
    } else {
      super(data, 1);
    }
  }
}

export class Signature {
  r: Bytes32;
  s: Bytes32;
  v: Bytes1;

  constructor(data: string | Uint8Array) {
    const sig = ethers.utils.splitSignature(new Bytes(data, 65).data);
    if (sig.v === undefined && sig.recoveryParam === undefined) {
      assert(false, 'There should be v or recoveryParam');
    }

    this.r = new Bytes32(sig.r);
    this.s = new Bytes32(sig.s);
    this.v = new Bytes1(sig.v ?? (sig.recoveryParam ?? 0) + 27);
  }

  joint(): Bytes {
    return new Bytes(
      ethers.utils.concat([this.r.data, this.s.data, this.v.data])
    );
  }

  hex(): string {
    return this.joint().hex();
  }
}

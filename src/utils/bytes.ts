import assert from 'assert';
import { ethers } from 'ethers';
import { t, validate, validateMultiple } from '../type-validation';

export interface Byted {
  data: Uint8Array;
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
      this.data = ethers.utils.arrayify('0x' + data.toString(16));
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

export class Signature implements Byted {
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

  get data() {
    return this.joint().data;
  }

  hex(): string {
    return this.joint().hex();
  }

  number(): number | never {
    assert.ok(
      this.data.length <= 4,
      'Converting Bytes to Number resulted in overflow'
    );
    return this.joint().number();
  }
}

import { TypeCheckers } from './type-checkers.test';
import { UrlTest } from './url.test';
import { Signing } from './sign.test';
import { MerkleRoot } from './merkle.test';
import { ProviderMethods } from './provider.test';

export const Utils = () =>
  describe('Utils', () => {
    TypeCheckers();
    UrlTest();
    Signing();
    MerkleRoot();
    ProviderMethods();
  });

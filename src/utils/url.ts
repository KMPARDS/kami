export class URLMask {
  url: URL;

  constructor(urlstr: string) {
    this.url = new URL(urlstr);
    if (!['http:', 'https:'].includes(this.url.protocol)) {
      throw new Error('This protocol is not supported');
    }
  }

  toString(): string {
    return this.url.toString();
  }

  eq(otherUrl: URLMask | string): boolean {
    return this._eq(
      otherUrl instanceof URLMask ? otherUrl : new URLMask(otherUrl)
    );
  }

  // TODO: check if it's possible for same peer to accept requests from two IPs
  //  If yes then some procedure needs to be followed, while checking equality
  private _eq(otherUrl: URLMask): boolean {
    const _thisUrl: URL = new URL(this.toString());
    const _otherUrl: URL = new URL(otherUrl.toString());
    if (_thisUrl.hostname === 'localhost') {
      _thisUrl.hostname = '127.0.0.1';
    }
    if (_otherUrl.hostname === 'localhost') {
      _otherUrl.hostname = '127.0.0.1';
    }
    return _thisUrl.toString() === _otherUrl.toString();
  }
}

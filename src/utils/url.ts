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
    if (otherUrl instanceof URLMask) {
      return this.toString() === otherUrl.toString();
    } else {
      return this.toString() === new URLMask(otherUrl).toString();
    }
  }
}

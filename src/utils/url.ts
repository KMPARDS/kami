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
}

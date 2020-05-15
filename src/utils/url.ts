import { t, validateParam, check } from '../type-validation';

export class URL {
  protocol: 'http' | 'https';
  location: string;
  port: number | null;

  constructor(url: string) {
    validateParam({ url }, t.string);
    const urlSplit = url.split(':');
    if (urlSplit[0] === 'http' || urlSplit[0] === 'https') {
      this.protocol = urlSplit[0];
    } else {
      throw new Error(`Unsupported URL protocol: ${urlSplit[0]}`);
    }
    if (urlSplit[1].slice(0, 2) === '//') {
      this.location = urlSplit[1].slice(2);
    } else {
      throw new Error(`Invalid URL: ${urlSplit[1]}`);
    }
    if (urlSplit[2] === undefined) {
      this.port = null;
    } else if (check(+urlSplit[2], t.uint)) {
      this.port = +urlSplit[2];
    } else {
      throw new Error(`Invalid URL Port: ${urlSplit[2]}`);
    }
  }

  toString(): string {
    return `${this.protocol}://${this.location}:${this.port}`;
  }
}

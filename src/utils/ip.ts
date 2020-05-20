import { networkInterfaces } from 'os';

const ifaces = networkInterfaces();

export function getLocalExternalIP(): string {
  let address: string = '';
  for (var dev in ifaces) {
    // @ts-ignore
    ifaces[dev].filter((details) =>
      details.family === 'IPv4' && details.internal === false
        ? (address = details.address)
        : undefined
    );
  }

  return address;
}

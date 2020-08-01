import os from 'os';

export async function getSystemUtilisation() {
  const cpuInfo = os.cpus();
  const totalmem = os.totalmem();
  const freemem = os.freemem();
  const loadavg = os.loadavg();
  return { cpuInfo, totalmem, freemem, loadavg };
}

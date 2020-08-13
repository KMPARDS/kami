export function createRoutine(fn: Function, msec: number, name: string): void {
  let taskRunning = false;
  setInterval(async () => {
    if (!taskRunning) {
      taskRunning = true;
      try {
        await fn();
      } catch (error) {
        console.log(`Error in ${name}:`, error?.message);
      }
      taskRunning = false;
    }
  }, msec);
}

const wait = (seconds: number) =>
   new Promise((res) => setTimeout(res, seconds * 1000));

export { wait };

export const createLogger = (debug) => {
  return (msg) => {
    if (debug) {
      console.log(msg);
    }
  };
};

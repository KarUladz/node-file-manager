import os from "node:os";

const curPath = os.homedir();

export const getCurrentPath = () => {
  return curPath;
};

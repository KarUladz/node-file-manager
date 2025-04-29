import os from "node:os";

const curPath = os.homedir()

export const getCurrentPath = () => {
  return `You are currently in ${curPath}\n`;
};

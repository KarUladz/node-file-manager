import { access, stat } from "node:fs/promises";
import path from "node:path";

import currentPath from "../utils/current-path.js";

export const operationCd = async (data) => {
  const curPath = currentPath.getPath();

  let userPath = data.replace("cd", "").trim();
  if (userPath.includes("'") || userPath.includes('"')) {
    userPath = cleanString(userPath);
  }

  const findWinSep = userPath.indexOf(":");
  let preCurDir = "";

  if (findWinSep === 1) {
    const uPath = userPath[0].toUpperCase() + userPath.slice(1);

    preCurDir = path.normalize(path.join(uPath));
  } else {
    preCurDir = path.normalize(path.join(curPath, userPath));
  }
  try {
    await access(preCurDir);
    const stats = await stat(preCurDir);
    if (stats.isDirectory()) currentPath.setPath(preCurDir);
    else {
      throw new Error();
    }
  } catch (error) {
    process.stdout.write("Invalid input! Try again:\n");
  }
};

const cleanString = (string) => {
  const clearString = string
    .split("")
    .filter((item) => item !== "'" && item !== '"')
    .join("");

  return clearString;
};

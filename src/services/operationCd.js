import { access, stat } from "node:fs/promises";

import currentPath from "../utils/current-path.js";
import { normalizePathString } from "../utils/normalizePathString.js";

export const operationCd = async (comandKey, data) => {
  const normalizePath = normalizePathString(comandKey, data);

  try {
    await access(normalizePath);
    const stats = await stat(normalizePath);
    if (stats.isDirectory()) currentPath.setPath(normalizePath);
    else {
      throw new Error();
    }
  } catch (error) {
    process.stdout.write("Invalid input! Try again:\n");
  }
};

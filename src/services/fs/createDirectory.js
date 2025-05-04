import fs from "node:fs/promises";
import path from "node:path";

import { normalizePathString } from "../../utils/normalizePathString.js";
import currentPath from "../../utils/current-path.js";

export const createDirectory = async (commandKey, data) => {
  const normalizePath = normalizePathString(commandKey, data);
  const pathNow = path.normalize(
    `${currentPath.getPath()}/${path.basename(normalizePath)}`
  );

  if (pathNow === normalizePath) {
    await fs.mkdir(normalizePath, { recursive: false });
  } else {
    console.log("Operation failed");
    return
  }
};

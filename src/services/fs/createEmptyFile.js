import fs from "node:fs";
import path from "node:path";
import currentPath from "../../utils/current-path.js";

import { normalizePathString } from "../../utils/normalizePathString.js";

export const createEmptyFile = async (comandKey, data) => {
  const normalizePath = normalizePathString(comandKey, data);
  const pathNow = path.normalize(
    `${currentPath.getPath()}/${path.basename(normalizePath)}`
  );

  if (pathNow === normalizePath) {
    fs.open(normalizePath, "ax", (err, _) => {
      if (err) console.log("Operation failed! File already exists\n");
    });
  } else {
    console.log("Invalid input");
  }
};

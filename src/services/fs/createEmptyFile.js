import fs from "node:fs";

import { normalizePathString } from "../../utils/normalizePathString.js";

export const createEmptyFile = async (comandKey, data) => {
  const normalizePath = normalizePathString(comandKey, data);

  fs.open(normalizePath, "ax", (err, _) => {
    if (err) process.stdout.write("Operation failed!\n");
  });
};

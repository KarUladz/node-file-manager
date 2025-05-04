import fs from "node:fs";

import { normalizePathString } from "../../utils/normalizePathString.js";

export const createEmptyFile = async (comandKey, data) => {
  const normalizePath = normalizePathString(comandKey, data);
  console.log(normalizePath);
  fs.open(normalizePath, "ax", (err, _) => {
    if (err) console.log("Operation failed!\n");
  });
};

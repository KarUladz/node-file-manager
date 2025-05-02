import fs from "node:fs/promises";

import { normalizePathString } from "../../utils/normalizePathString.js";

export const createDirectory = async (comandKey, data) => {
  const normalizePath = normalizePathString(comandKey, data);

  try {
    await fs.mkdir(normalizePath, { recursive: false });
  } catch (error) {
    process.stdout.write("Operation failed\n");
  }
};

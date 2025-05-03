import fs from "node:fs/promises";

import { normalizePathString } from "../../utils/normalizePathString.js";
import { getPathsArrayFromString } from "../../utils/getPathsArrayFromString.js";

export const renameFile = async (commandKey, data) => {
  const updateData = data.replace(commandKey, "");
  let dataArray = [];

  if (updateData.includes("'") || updateData.includes('"')) {
    dataArray = getPathsArrayFromString(updateData);
  } else {
    dataArray = data.trim().split(" ");
  }

  if (dataArray.length !== 2) {
    console.log("Invalid input");
    return;
  }

  const currentFilePath = normalizePathString(commandKey, dataArray[0]);
  const futureFilePath = normalizePathString(commandKey, dataArray[1]);

  try {
    await fs.access(currentFilePath);
    await fs
      .stat(futureFilePath)
      .then(() => {
        throw new Error();
      })
      .catch(async () => {
        await fs.rename(currentFilePath, futureFilePath).catch(() => {
          throw new Error();
        });
      });
  } catch {
    console.log("Operation failed");
  }
};

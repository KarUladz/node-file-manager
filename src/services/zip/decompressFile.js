import fs from "node:fs";
import { stat, access } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";

import { normalizePathString } from "../../utils/normalizePathString.js";
import { getPathsArrayFromString } from "../../utils/getPathsArrayFromString.js";
import { invalidInput, operationFailed } from "../../utils/index.js";

export const decompressFile = async (commandKey, data) => {
  try {
    const updateData = data.replace(commandKey, "");
    let dataArray = [];

    if (updateData.includes("'") || updateData.includes('"')) {
      dataArray = getPathsArrayFromString(updateData);
    } else {
      dataArray = updateData.trim().split(" ");
    }

    if (dataArray.length !== 2) {
      invalidInput("Too many arguments, try using quotation marks.");
      return;
    }

    const currentFilePath = normalizePathString(commandKey, dataArray[0]);

    const stats = await stat(currentFilePath);
    if (!stats.isFile()) {
      invalidInput("Object is not a file");
      return;
    }

    const fileName = path.basename(currentFilePath);

    const futureFilePath = normalizePathString(
      commandKey,
      `${dataArray[1]}/${fileName}`
    );
    let updatedFuturePath = futureFilePath;

    if (futureFilePath.endsWith(".br")) {
      updatedFuturePath = futureFilePath.slice(0, -3);
    } else {
      invalidInput("File was not compressed");
      return;
    }

    try {
      await access(updatedFuturePath);
      operationFailed("File already exists");
      return;
    } catch (error) {}

    try {
      const rs = fs.createReadStream(currentFilePath);
      const ws = fs.createWriteStream(updatedFuturePath);
      await pipeline(rs, createBrotliDecompress(), ws);
    } catch (error) {
      operationFailed(error.message);
      return;
    }
  } catch (error) {
    operationFailed(error.message);
    return;
  }
};

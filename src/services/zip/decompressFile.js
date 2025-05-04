import fs from "node:fs";
import { stat, access } from "node:fs/promises";
import path from "node:path";
import { createBrotliDecompress } from "node:zlib";

import { normalizePathString } from "../../utils/normalizePathString.js";
import { getPathsArrayFromString } from "../../utils/getPathsArrayFromString.js";
import { pipeline } from "node:stream/promises";

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
      console.log("Invalid input");
      return;
    }

    const currentFilePath = normalizePathString(commandKey, dataArray[0]);

    const stats = await stat(currentFilePath);
    if (!stats.isFile()) {
      console.log("Invalid input");
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
      console.log("Invalid input");
      return;
    }

    try {
      await access(updatedFuturePath);
      console.log("Operation failed. File already exists");
      return;
    } catch (error) {}

    try {
      const rs = fs.createReadStream(currentFilePath);
      const ws = fs.createWriteStream(updatedFuturePath);
      await pipeline(rs, createBrotliDecompress(), ws);
    } catch (error) {
      console.log("Operation failed");
      return;
    }
  } catch (error) {
    console.log("Operation failed");
    return;
  }
};

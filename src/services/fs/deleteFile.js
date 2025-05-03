import fs from "node:fs";
import { stat } from "node:fs/promises";

import { normalizePathString } from "../../utils/normalizePathString.js";

export const deleteFile = async (commandKey, data) => {
  try {
    const currentFilePath = normalizePathString(commandKey, data);

    const stats = await stat(currentFilePath);
    if (stats.isFile()) {
      fs.unlink(currentFilePath, (err) => {
        if (err) {
          console.log("Operation failed");
          return;
        }
      });
    } else {
      console.log("Invalid Input! Try again");
    }
  } catch (err) {
    console.log("Invalid Input! Try again");
  }
};

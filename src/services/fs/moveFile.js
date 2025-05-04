import fs from "node:fs";
import { access, stat } from "node:fs/promises";
import path from "node:path";

import { normalizePathString } from "../../utils/normalizePathString.js";
import { getPathsArrayFromString } from "../../utils/getPathsArrayFromString.js";

export const moveFile = async (commandKey, data) => {
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
    if (stats.isFile()) {
      const fileName = path.basename(currentFilePath);

      const futureFilePath = normalizePathString(
        commandKey,
        `${dataArray[1]}/${fileName}`
      );
      try {
        await access(futureFilePath);
        console.log("Operation failed. File already exists");
        return;
      } catch (err) {}

      const rs = fs.createReadStream(currentFilePath, { encoding: "utf-8" });
      const ws = fs.createWriteStream(futureFilePath, { encoding: "utf-8" });

      rs.on("error", () => {
        ws.end();
        console.log("Operation failed");
        return;
      });

      ws.on("error", (err) => {
        rs.destroy();
        console.log("Operation failed");
        return;
      });

      ws.on("finish", (err) => {
        fs.unlink(currentFilePath, (err) => {
          if (err) {
            console.log("Operation failed");
            return;
          }
        });
      });
      rs.pipe(ws);
    }
  } catch (err) {
    console.log("Operation failed");
    return;
  }
};

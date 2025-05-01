import { readdir } from "node:fs/promises";

import currentPath from "../utils/current-path.js";

export const operationLs = async () => {
  try {
    const path = currentPath.getPath();
    const dirFiles = await readdir(path, {
      withFileTypes: true,
      encoding: "utf-8",
    });

    const filesObjArray = dirFiles.map((file) => {
      return {
        name: file.name,
        type: file.isDirectory() ? "directory" : "file",
      };
    });
    console.table(filesObjArray);
  } catch (error) {
    process.stdout.write("Operation failed\n");
  }
};

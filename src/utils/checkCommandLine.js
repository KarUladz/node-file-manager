import process from "node:process";

import {
  createDirectory,
  createEmptyFile,
  operationCd,
  operationLs,
  operationUp,
} from "../services/index.js";
import { readFile } from "../services/fs/readFile.js";

export const checkCommandLine = async (data) => {
  const commandKey = data.split(" ")[0];
  switch (commandKey) {
    case ".exit":
      process.exit();
      break;
    case "add":
      await createEmptyFile(commandKey, data);
      break;
    case "cat":
      await readFile(commandKey, data);
      break;
    case "cd":
      await operationCd(commandKey, data);
      break;
    case "mkdir":
      await createDirectory(commandKey, data);
      break;
    case "ls":
      await operationLs();
      break;
    case "up":
      await operationUp();
      break;
    default:
      process.stdout.write("\nInvalid input! Try again:\n");
      break;
  }
};

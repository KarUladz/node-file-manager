import process from "node:process";

import {
  copyFile,
  createDirectory,
  createEmptyFile,
  deleteFile,
  moveFile,
  operationCd,
  operationLs,
  operationUp,
  readFile,
  renameFile,
} from "../services/index.js";

export const checkCommandLine = async (data) => {
  const commandKey = data.split(" ")[0].trim();
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
    case "cp":
      await copyFile(commandKey, data);
      break;
    case "mkdir":
      await createDirectory(commandKey, data);
      break;
    case "mv":
      await moveFile(commandKey, data);
      break;
    case "ls":
      await operationLs();
      break;
    case "rn":
      await renameFile(commandKey, data);
      break;
    case "rm":
      await deleteFile(commandKey, data);
      break;
    case "up":
      await operationUp();
      break;
    default:
      process.stdout.write("\nInvalid input! Try again:\n");
      break;
  }
};

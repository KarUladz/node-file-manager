import process from "node:process";

import { operationCd, operationLs, operationUp } from "../services/index.js";

export const checkCommandLine = async (data) => {
  switch (data.split(" ")[0]) {
    case ".exit":
      process.exit();
      break;
    case "cd":
      await operationCd(data);
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

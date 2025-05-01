import process from "node:process";

import { operationLs } from "../services/index.js";


export const checkCommandLine = async (data) => {
  switch (data.split(' ')[0]) {
    case ".exit":
      process.exit();
      break;
    case "ls":
      await operationLs()
      break;
    default:
      process.stdout.write("\nInvalid input! Try again:\n");
      break;
  }
};

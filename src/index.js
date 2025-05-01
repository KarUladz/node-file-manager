import readline from "node:readline";
import process from "node:process";

import { closeFIleManager } from "./services/index.js";
import {
  getUserName,
  checkCommandLine,
  getCurrentPath,
} from "./utils/index.js";

const appRun = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const user = getUserName();

  rl.output.write(
    `Welcome to the File Manager, ${user}!\nYou are currently in ${getCurrentPath()}\n`
  );

  rl.on("line", async (input) => {
    await checkCommandLine(input);
  });

  process.on("exit", () => closeFIleManager(user));
};

appRun();

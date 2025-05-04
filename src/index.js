import readline from "node:readline";
import process from "node:process";

import { closeFIleManager } from "./services/index.js";
import { checkUserCommandLine } from "./services/checkUserCommandLine.js";

import { getUserName } from "./utils/index.js";
import currentPath from "./utils/current-path.js";

const appRun = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const user = getUserName();

  process.stdout.write(
    `Welcome to the File Manager, ${user}!\nYou are currently in ${currentPath.getPath()}\n`
  );

  rl.on("line", async (input) => {
    await checkUserCommandLine(input);
    process.stdout.write(`\nYou are currently in ${currentPath.getPath()}\n`);
  });

  process.on("exit", () => closeFIleManager(user));
};

appRun();

import readline from "node:readline";
import process from "node:process";

import { closeFIleManager } from "./services/index.js";
import {
  getUserName,
  checkCommandLine,
} from "./utils/index.js";
import currentPath from "./utils/current-path.js";

const appRun = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const user = getUserName();

  rl.output.write(
    `Welcome to the File Manager, ${user}!\nYou are currently in ${currentPath.getPath()}\n`
  );

  rl.on("line", async (input) => {
    await checkCommandLine(input);
    rl.output.write(
      `\nYou are currently in ${currentPath.getPath()}\n`
    );
  });

  process.on("exit", () => closeFIleManager(user));
};

appRun();

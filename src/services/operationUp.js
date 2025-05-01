import { readdir } from "node:fs/promises";
import path from "node:path";
import curPath from "../utils/current-path.js";

export const operationUp = async () => {
  const pathNow = curPath.getPath();

  const pathArray = pathNow.split(":");
  if (pathArray.length > 1) {
    curPath.setPath(path.dirname(pathNow));
  }
  return;
};

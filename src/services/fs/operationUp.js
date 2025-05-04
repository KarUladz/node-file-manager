import path from "node:path";

import currentPath from "../../utils/current-path.js";

export const operationUp = async () => {
  const pathParsed = path.parse(currentPath.getPath());
  const rootDir = pathParsed.root;

  if (rootDir === currentPath.getPath()) {
    console.log("Invalid input");
  } else {
    const pathNow = currentPath.getPath();
    currentPath.setPath(path.dirname(pathNow));
  }

  return;
};

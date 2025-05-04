import path from "node:path";

import currentPath from "../../utils/current-path.js";

export const operationUp = async () => {
  const pathNow = currentPath.getPath();

  currentPath.setPath(path.dirname(pathNow));

  return;
};

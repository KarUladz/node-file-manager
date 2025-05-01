import os from "node:os";

class CurrentPath {
  constructor() {
    this.currentPath = os.homedir();
  }

  getPath() {
    return this.currentPath;
  }

  setPath(newPath) {
    this.currentPath = newPath;
  }
}

const curPath = new CurrentPath();

export default curPath;

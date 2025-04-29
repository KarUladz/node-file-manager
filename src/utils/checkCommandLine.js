import process from "node:process";

export const checkCommandLine = (data) => {
  switch (data) {
    case ".exit":
      process.exit();
      break;
    default:
      process.stdout.write("\nInvalid input! Try again:\n");
      break;
  }
};

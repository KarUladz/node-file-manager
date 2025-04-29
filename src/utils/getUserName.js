import pc from "node:process";

export const getUserName = () => {
  const userData = pc.argv.filter((el) => el.includes("--username"));

  return userData.length ? userData[0].split("=")[1] : "unknown";
};

import pc from "node:process";

let userName = "";

export const getUserName = () => {
  if (!userName.length) {
    const userData = pc.argv.filter((el) => el.includes("--username"));
    userName = userData.length ? userData[0].split("=")[1] : "Mystery visitor";
    return userName;
  }

  return userName;
};

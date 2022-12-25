import { argv } from "process";

export async function readUsername() {
  const arg = argv.find(a => a.includes("--username"));
  if (arg) {
    const [, username] = arg.split("=");
    return username;
  }
  return "Anonymous";
}
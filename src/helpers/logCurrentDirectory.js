import { cwd } from "process";

export function logCurrentDirectory() {
  const currentDir = cwd();
  console.log(`You are currently in ${currentDir}`);
}
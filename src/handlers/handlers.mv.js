import { rm } from "fs/promises";
import { handlersCp } from "./handlers.cp.js";

export async function handlersMv(pathToFile, newDirectoryPath) {
  const oldPath = await handlersCp(pathToFile, newDirectoryPath);
  await rm(oldPath);
}
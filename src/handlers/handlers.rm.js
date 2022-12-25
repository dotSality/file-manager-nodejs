import { exists } from "../helpers/exists.js";
import { resolve } from "path";
import { rm } from "fs/promises";
import { DEFAULT_ERROR } from "../constants/errors.js";

export async function handlersRm(pathToFile) {
  const resolvedPath = resolve(pathToFile);
  const isFileExists = await exists(resolvedPath);
  if (isFileExists) {
    await rm(resolvedPath);
  } else {
    throw new Error(DEFAULT_ERROR);
  }
}
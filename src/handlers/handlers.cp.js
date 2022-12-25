import { resolveFilePaths } from "../helpers/pathHelpers.js";
import { exists } from "../helpers/exists.js";
import { createPipe } from "../helpers/createPipe.js";
import { DEFAULT_ERROR } from "../constants/errors.js";

export async function handlersCp(pathToFile, newDirectoryPath) {
  const [oldFilepath, newFilepath] = resolveFilePaths(pathToFile, newDirectoryPath);
  const isFileExists = await exists(newFilepath);
  if (!isFileExists) {
    await createPipe(oldFilepath, newFilepath);
    return oldFilepath;
  } else {
    throw new Error(DEFAULT_ERROR);
  }
}
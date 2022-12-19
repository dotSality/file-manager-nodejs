import { rename } from "fs/promises";
import { dirname, join, resolve } from "path";
import { testFilename } from "../helpers/testFilename.js";
import { exists } from "../helpers/exists.js";
import { DEFAULT_ERROR } from "../constants/errors.js";

export async function handlersRn(pathToFile, newFilename) {
  const isFilenameValid = testFilename(newFilename);
  if (isFilenameValid) {
    const oldFilepath = resolve(pathToFile);
    const oldDirname = dirname(oldFilepath);
    const resultPath = join(oldDirname, newFilename);
    const isFileExists = await exists(resultPath);
    if (!isFileExists) {
      await rename(oldFilepath, resultPath);
    }
  } else {
    throw new Error(DEFAULT_ERROR);
  }
}
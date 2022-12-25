import { cwd } from "process";
import { join, resolve } from "path";
import { exists } from "../helpers/exists.js";
import { appendFile } from "fs/promises";
import { testFilename } from "../helpers/testFilename.js";
import { DEFAULT_ERROR } from "../constants/errors.js";

export async function handlersAdd(filename) {
  const isFilenameValid = testFilename(filename);
  if (isFilenameValid) {
    const currentDir = resolve(cwd());
    const filePath = join(currentDir, filename);
    const isFileExists = await exists(filePath);
    if (!isFileExists) {
      await appendFile(filePath, "");
    }
  } else {
    throw new Error(DEFAULT_ERROR);
  }
}
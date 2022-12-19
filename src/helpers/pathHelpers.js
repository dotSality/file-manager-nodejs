import { basename, join, resolve } from "path";

export function getFilename(pathToFile) {
  return basename(pathToFile);
}

// Use to get origin and new path for file system operations
export function resolveFilePaths(originFilePath, newFolderPath) {
  const oldFilepath = resolve(originFilePath);
  const filename = getFilename(oldFilepath);
  const newFilepath = join(resolve(newFolderPath), filename);
  return [oldFilepath, newFilepath];
}
import { cwd } from "process";
import { readdir } from "fs/promises";
import { isFile } from "../helpers/isFile.js";
import { resolve } from "path";
import { pipeCallback } from "../helpers/pipeCallback.js";

export async function handlersLs() {
  const currentDir = resolve(cwd());
  const files = await readdir(currentDir);
  const result = await Promise.all(files.map(async (file) => {
    const aa = await pipeCallback(isFile, file);
    return { title: file, type: aa ? "file" : "directory" };
  }));
  result.sort((prev, next) => {
    const compareByType = prev.type.localeCompare(next.type);
    if (compareByType > 0) {
      return prev.title.localeCompare(next.title);
    }
    return compareByType;
  });
  console.table(result);
}
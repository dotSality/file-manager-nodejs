import { chdir } from "process";
import { DEFAULT_ERROR } from "../constants/errors.js";
import { ROOT_DISK_FOLDER_REGEX } from "../constants/regex.js";
import { resolve, sep } from "path";

export async function handlersCd(pathname) {
  if (!pathname) {
    throw new Error(DEFAULT_ERROR);
  }
  const resultDir = ROOT_DISK_FOLDER_REGEX.test(pathname) ? `${pathname}${sep}` : pathname;
  chdir(resolve(resultDir));
}
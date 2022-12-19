import { FILENAME_TEST_REGEX } from "../constants/regex.js";

export function testFilename(filename) {
  const filenameRegex = new RegExp(FILENAME_TEST_REGEX);
  return filenameRegex.test(filename);
}
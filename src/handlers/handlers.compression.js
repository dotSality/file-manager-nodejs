import { basename, join, resolve } from "path";
import { exists } from "../helpers/exists.js";
import { DEFAULT_ERROR, INVALID_INPUT_ERROR } from "../constants/errors.js";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { createPipe } from "../helpers/createPipe.js";
import { COMPRESSION_TYPES } from "../constants/enums.js";
import { COMPRESSED_EXTENSION_REGEX } from "../constants/regex.js";

export async function handleCompression(pathToFile, destinationPath, type) {
  const resolvedFilePath = resolve(pathToFile);
  const isFileExists = await exists(resolvedFilePath);
  if (!isFileExists) {
    throw new Error(DEFAULT_ERROR);
  }
  const filename = basename(resolvedFilePath);
  switch (type) {
    case COMPRESSION_TYPES.COMPRESS:
      const compressedFileName = `${filename}.br`;
      const compressedOutputPath = resolve(join(destinationPath, compressedFileName));
      const brotliCompress = createBrotliCompress();
      await createPipe(resolvedFilePath, compressedOutputPath, brotliCompress);
      break;
    case COMPRESSION_TYPES.DECOMPRESS:
      if (!COMPRESSED_EXTENSION_REGEX.test(filename)) {
        throw new Error(DEFAULT_ERROR);
      }
      const decompressedFileName = filename.replace(".br", "");
      const decompressedOutputPath = resolve(join(destinationPath, decompressedFileName));
      const brotliDecompress = createBrotliDecompress();
      await createPipe(resolvedFilePath, decompressedOutputPath, brotliDecompress);
      break;
    default:
      throw new Error(INVALID_INPUT_ERROR);
  }
}
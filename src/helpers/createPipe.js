import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";

export async function createPipe(originPath, newPath, extraPipe = undefined) {
  const readable = createReadStream(originPath);
  const writable = createWriteStream(newPath);
  if (extraPipe) {
    await pipeline(readable, extraPipe, writable);
  } else {
    await pipeline(readable, writable);
  }
}
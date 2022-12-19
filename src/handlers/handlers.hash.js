import { resolve } from "path";
import { createHash } from "crypto";
import { createReadStream } from "fs";
import { pipeline } from "stream/promises";
import { Writable } from "stream";

export async function handlersHash(pathToFile) {
  const filepath = resolve(pathToFile);
  const hash = createHash("sha256");
  const readable = createReadStream(filepath);
  const writable = new Writable({
    write(chunk, _, callback) {
      console.log(chunk.toString());
      callback();
    }
  });
  await pipeline(readable, hash.setEncoding("hex"), writable);
}
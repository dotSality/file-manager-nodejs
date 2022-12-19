import { resolve } from "path";
import { createReadStream } from "fs";
import { DEFAULT_ERROR } from "../constants/errors.js";

export async function handlersCat(path) {
  const filePath = resolve(path);
  const readable = createReadStream(filePath, { encoding: "utf-8" });
  readable.on("data", (chunk) => {
    console.log(chunk.toString());
  }).on("error", () => {
    console.log(DEFAULT_ERROR);
  });
}
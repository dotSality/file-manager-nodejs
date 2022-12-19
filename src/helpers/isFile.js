import { resolve } from "path";
import { stat } from "fs/promises";

export async function isFile(path) {
  const filePath = resolve(path);
  const stats = await stat(filePath);
  return stats.isFile();
}
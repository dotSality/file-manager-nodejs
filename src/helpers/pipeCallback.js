import { handleError } from "./handleError.js";

export async function pipeCallback(callback, ...args) {
  const boundCallback = callback.bind(null, ...args);
  const result = await handleError(boundCallback);
  return result;
}
import { DEFAULT_ERROR, INVALID_INPUT_ERROR } from "../constants/errors.js";

export async function handleError(callback) {
  try {
    const result = await callback();
    return result;
  } catch (e) {
    console.log(e.message === INVALID_INPUT_ERROR || e.message === DEFAULT_ERROR ? e.message : INVALID_INPUT_ERROR);
  }
}
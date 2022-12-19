import { handleError } from "../helpers/handleError.js";
import { logCurrentDirectory } from "../helpers/logCurrentDirectory.js";
import {
  handlersUp,
  handlersLs,
  handlersCd,
  handlersCat,
  handlersAdd,
  handlersRn,
  handlersCp,
  handlersMv,
  handlersRm,
  handlersOs,
  handlersHash,
  handleCompression,
} from "../handlers/index.js";
import { INVALID_INPUT_ERROR } from "../constants/errors.js";
import { pipeCallback } from "../helpers/pipeCallback.js";
import { COMPRESSION_TYPES } from "../constants/enums.js";

export async function handleInput(chunk, readline) {
  const [command, ...restChunk] = chunk.toString().trim().split(" ");
  const [firstArg, secondArg] = restChunk;
  switch (command) {
    case "up":
      await handleError(handlersUp);
      break;
    case "cd":
      await pipeCallback(handlersCd, firstArg);
      break;
    case "ls":
      await handlersLs();
      break;
    case "cat":
      await pipeCallback(handlersCat, firstArg);
      break;
    case "add":
      await pipeCallback(handlersAdd, firstArg);
      break;
    case "rn":
      await pipeCallback(handlersRn, firstArg, secondArg);
      break;
    case "cp":
      await pipeCallback(handlersCp, firstArg, secondArg);
      break;
    case "mv":
      await pipeCallback(handlersMv, firstArg, secondArg);
      break;
    case "rm":
      await pipeCallback(handlersRm, firstArg);
      break;
    case "os":
      await pipeCallback(handlersOs, firstArg);
      break;
    case "hash":
      await pipeCallback(handlersHash, firstArg);
      break;
    case "compress":
      await pipeCallback(handleCompression, firstArg, secondArg, COMPRESSION_TYPES.COMPRESS);
      break;
    case "decompress":
      await pipeCallback(handleCompression, firstArg, secondArg, COMPRESSION_TYPES.DECOMPRESS);
      break;
    case ".exit":
      readline.close();
      break;
    default:
      throw new Error(INVALID_INPUT_ERROR);
  }
  logCurrentDirectory();
}
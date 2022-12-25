import { cpus, EOL, userInfo } from "os";
import { arch } from "process";
import { DEFAULT_ERROR } from "../constants/errors.js";
import { OS_ARGUMENTS } from "../constants/enums.js";

export async function handlersOs(argument) {
  switch (argument) {
    case OS_ARGUMENTS.EOL:
      const eolOutput = JSON.stringify(EOL);
      console.log(eolOutput);
      break;
    case OS_ARGUMENTS.CPUS:
      const cpusOutput = cpus().map(({ model, speed }) => ({ model, speed: `${speed / 1000} GHz` }));
      console.log({
        amount: cpus().length,
        info: cpusOutput,
      });
      break;
    case OS_ARGUMENTS.HOMEDIR:
      console.log(userInfo().homedir);
      break;
    case OS_ARGUMENTS.USERNAME:
      console.log(userInfo().username);
      break;
    case OS_ARGUMENTS.ARCHITECTURE:
      console.log(arch);
      break;
    default:
      throw new Error(DEFAULT_ERROR);
  }
}
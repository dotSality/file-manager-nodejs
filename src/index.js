import { homedir } from "os";
import { chdir, stdin, stdout } from "process";
import { createInterface } from "readline/promises";
import { readUsername } from "./helpers/readUsername.js";
import { handleError } from "./helpers/handleError.js";
import { logCurrentDirectory } from "./helpers/logCurrentDirectory.js";
import { pipeCallback } from "./helpers/pipeCallback.js";
import { handleInput } from "./app/handleInput.js";

const bootstrap = async () => {
  const username = await readUsername();
  const readline = await createInterface({
    input: stdin, output: stdout
  });
  readline.on("line", (chunk) => pipeCallback(handleInput, chunk, readline))
          .on("SIGINT", readline.close)
          .on("close", () => {
            console.log(`Thank you for using File Manager, ${username}, goodbye!`);
          });
  chdir(homedir());
  console.log(`Welcome to the File Manager, ${username}!`);
  logCurrentDirectory();
};

await handleError(bootstrap);
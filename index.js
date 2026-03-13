import setup from "./setup.js";
import { bench, run } from "mitata";
import { cp } from "node:fs/promises";
import { cpSync, rmSync } from "node:fs";

const arg = process.argv[2];
const mode = arg === "async" ? "async" : "sync";

const paths = await setup();

let destDir = paths.destinationDir;
let iteration = 0;

if (mode === "async") {
  bench("fs.promises.cp recursive with deep tree + symlinks", async () => {
    await cp(paths.sourceDir, destDir, {
      recursive: true,
      preserveTimestamps: true,
      verbatimSymlinks: true,
      force: true,
      errorOnExist: false,
    });
    destDir = `${paths.destinationDir}-${iteration++}`;
  }).gc("inner");
} else {
  bench("fs.cpSync recursive with deep tree + symlinks", () => {
    cpSync(paths.sourceDir, destDir, {
      recursive: true,
      preserveTimestamps: true,
      verbatimSymlinks: true,
      force: true,
      errorOnExist: false,
    });
    destDir = `${paths.destinationDir}-${iteration++}`;
  }).gc("inner");
}

try {
  await run();
} finally {
  rmSync(paths.rootDir, { recursive: true, force: true });
}

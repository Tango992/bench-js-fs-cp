import setup from "./setup.js";
import { bench, run } from "mitata";
import { cp, rm } from "node:fs/promises";

const paths = await setup();

let destDir = paths.destinationDir;
let iteration = 0;
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

try {
  await run();
} finally {
  await rm(paths.rootDir, { recursive: true, force: true });
}

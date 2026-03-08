import { mkdir, mkdtemp, symlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

async function createNestedTree(rootDir, depth, branchFactor, filesPerDir) {
  await mkdir(rootDir, { recursive: true });

  for (let fileIndex = 0; fileIndex < filesPerDir; fileIndex += 1) {
    const fileName = `payload-${depth}-${fileIndex}.txt`;
    const fileContent = `depth=${depth};index=${fileIndex}\n`.repeat(32);
    await writeFile(join(rootDir, fileName), fileContent);
  }

  if (depth === 0) {
    return;
  }

  for (let branchIndex = 0; branchIndex < branchFactor; branchIndex += 1) {
    const childDir = join(rootDir, `d-${depth}-${branchIndex}`);
    await createNestedTree(childDir, depth - 1, branchFactor, filesPerDir);
  }
}

async function createSymlinks(sourceDir) {
  const linksDir = join(sourceDir, "links");
  await mkdir(linksDir, { recursive: true });

  await symlink(join(sourceDir, "d-4-0"), join(linksDir, "top-dir-link"));
  await symlink(
    join(sourceDir, "d-4-1", "d-3-1"),
    join(linksDir, "deep-dir-link"),
  );
  await symlink(
    join(sourceDir, "payload-4-0.txt"),
    join(linksDir, "top-file-link.txt"),
  );
  await symlink(
    join(sourceDir, "d-4-2", "payload-3-3.txt"),
    join(linksDir, "deep-file-link.txt"),
  );
}

async function setup() {
  const rootDir = await mkdtemp(join(tmpdir(), "cp-bench-"));
  const sourceDir = join(rootDir, "source");
  const destinationDir = join(rootDir, "destination");

  await createNestedTree(sourceDir, 4, 3, 18);
  await createSymlinks(sourceDir);

  return { rootDir, sourceDir, destinationDir };
}

export default setup;

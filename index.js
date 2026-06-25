#!/usr/bin/env node

import { access, cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const packageRoot = path.dirname(__filename);
const targetDir = process.cwd();

const REQUIRED_PATHS = ['AGENTS.md', '.agents', 'docs'];
const EMPTY_DIRS = ['progress', 'specs'];

async function pathExists(pathToCheck) {
  try {
    await access(pathToCheck);
    return true;
  } catch {
    return false;
  }
}

async function copyHarness() {
  for (const relativePath of REQUIRED_PATHS) {
    await cp(path.join(packageRoot, relativePath), path.join(targetDir, relativePath), {
      recursive: true,
      force: true,
    });
  }

  for (const relativePath of EMPTY_DIRS) {
    const emptyDirPath = path.join(targetDir, relativePath);

    if (!(await pathExists(emptyDirPath))) {
      await mkdir(emptyDirPath, { recursive: true });
    }
  }
}

async function main() {
  await copyHarness();
  console.log('✅ Harness creado en el directorio actual');
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});

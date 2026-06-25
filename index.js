#!/usr/bin/env node

import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const packageRoot = path.dirname(__filename);
const cwd = process.cwd();

const REQUIRED_PATHS = ['AGENTS.md', '.agents', 'docs'];
const EMPTY_DIRS = ['progress', 'specs'];

function usage() {
  console.error('Uso: simple-harness <nombre-carpeta>');
}

async function askTargetName() {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    usage();
    process.exitCode = 1;
    return '';
  }

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    return (await rl.question('Nombre de la carpeta destino: ')).trim();
  } finally {
    rl.close();
  }
}

function normalizeTargetName(rawName) {
  const targetName = rawName.trim();

  if (!targetName) {
    usage();
    process.exitCode = 1;
    return '';
  }

  return targetName;
}

async function copyHarness(targetDir) {
  await mkdir(targetDir, { recursive: true });

  for (const relativePath of REQUIRED_PATHS) {
    await cp(path.join(packageRoot, relativePath), path.join(targetDir, relativePath), {
      recursive: true,
      force: true,
    });
  }

  for (const relativePath of EMPTY_DIRS) {
    await mkdir(path.join(targetDir, relativePath), { recursive: true });
  }
}

async function main() {
  const rawTargetName = process.argv[2] ?? (await askTargetName());
  const targetName = normalizeTargetName(rawTargetName);

  if (!targetName) {
    return;
  }

  const targetDir = path.resolve(cwd, targetName);
  await copyHarness(targetDir);

  console.log(`✅ Harness creado en ${path.relative(cwd, targetDir) || '.'}`);
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});

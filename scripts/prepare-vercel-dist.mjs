import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const outDir = path.join(projectRoot, "out");
const distDir = path.join(projectRoot, "dist");

if (!existsSync(outDir)) {
  throw new Error("A pasta out nao foi gerada pelo next build.");
}

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });
await cp(outDir, distDir, { recursive: true });

console.log("Export estatico preparado em dist para a Vercel.");

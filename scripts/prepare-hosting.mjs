import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const serverEntry = resolve("dist/server/index.js");
const hostingSource = resolve(".openai/hosting.json");
const hostingDirectory = resolve("dist/.openai");
const hostingTarget = resolve(hostingDirectory, "hosting.json");

if (!existsSync(serverEntry)) {
  throw new Error("O pacote vinext nao gerou dist/server/index.js.");
}

if (!existsSync(hostingSource)) {
  throw new Error("A configuracao .openai/hosting.json nao foi encontrada.");
}

mkdirSync(hostingDirectory, { recursive: true });
copyFileSync(hostingSource, hostingTarget);

console.log("Pacote vinext preparado em dist para hospedagem.");

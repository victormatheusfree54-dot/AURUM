import { cpSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const exportDirectory = resolve("out");
const hostingDirectory = resolve("dist");

if (!existsSync(exportDirectory)) {
  throw new Error("A exportacao estatica nao foi encontrada na pasta out.");
}

rmSync(hostingDirectory, { recursive: true, force: true });
cpSync(exportDirectory, hostingDirectory, { recursive: true });

console.log("Exportacao preparada em dist para hospedagem.");

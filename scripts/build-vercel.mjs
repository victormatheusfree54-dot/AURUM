import { spawn } from "node:child_process";
import path from "node:path";

const command = path.join(
  process.cwd(),
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);

const child = spawn(process.execPath, [command, "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_OUTPUT_EXPORT: "1",
  },
});

child.on("exit", (code) => {
  if (code === 0) {
    const prepare = spawn(process.execPath, ["scripts/prepare-vercel-dist.mjs"], {
      stdio: "inherit",
      env: process.env,
    });

    prepare.on("exit", (prepareCode) => {
      process.exit(prepareCode ?? 1);
    });

    return;
  }

  process.exit(code ?? 1);
});

import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const poultry = join(root, "Envirolyte_Poultry_Web_Presentation");
const output = join(root, "vercel-dist");

const viteCli = join(poultry, "node_modules", "vite", "bin", "vite.js");
execFileSync(process.execPath, [viteCli, "build"], { cwd: poultry, stdio: "inherit" });

if (existsSync(output)) rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

cpSync(join(root, "index.html"), join(output, "index.html"));
cpSync(join(root, "assets"), join(output, "assets"), { recursive: true });
cpSync(join(root, "Accreditations"), join(output, "Accreditations"), { recursive: true });
cpSync(join(poultry, "dist"), join(output, "poultry"), { recursive: true });

console.log("Vercel bundle ready: / (legacy) and /poultry/ (new)");

// Fails if a raw hex color literal appears outside the allowed token source.
// Run in CI to prevent palette drift back into app code.
//
//   node scripts/check-no-raw-hex.mjs [dir=src] [--allow theme.ts]
//
// By default scans `src/` and allows `src/theme.ts` (the single source of truth).

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

const ROOT = process.argv[2] ?? "src";
const ALLOW = new Set(["theme.ts"]);
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx"]);
// 3- or 6-digit hex preceded by `#`, e.g. #fff / #c9a227.
const HEX = /#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?\b/;

const violations = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === "dist" || entry.startsWith(".")) {
      continue;
    }
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!EXTS.has(extname(full))) continue;
    if ([...ALLOW].some((a) => full.endsWith(a))) continue;

    const lines = readFileSync(full, "utf8").split("\n");
    lines.forEach((line, i) => {
      if (HEX.test(line)) {
        violations.push(`${relative(process.cwd(), full)}:${i + 1}: ${line.trim()}`);
      }
    });
  }
}

walk(ROOT);

if (violations.length > 0) {
  console.error("Raw hex color literals found (use design tokens instead):\n");
  for (const v of violations) console.error("  " + v);
  console.error(`\n${violations.length} violation(s).`);
  process.exit(1);
}

console.log("check-no-raw-hex: no raw hex literals outside the token source.");

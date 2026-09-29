// Regenerates src/index.ts from the folders in src/problems and src/structures.
// Usage: bun run generate

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderIndex, SRC_DIR } from "./problems";

writeFileSync(join(SRC_DIR, "index.ts"), renderIndex());
console.log("Updated src/index.ts");

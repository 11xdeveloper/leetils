// Regenerates src/index.ts and the problem list (PROBLEMS.md and
// docs/problems) from the folders in src/problems and src/structures.
// Usage: bun run generate

import { writeGeneratedFiles } from "./problems";

writeGeneratedFiles();
console.log("Updated src/index.ts and the problem list");

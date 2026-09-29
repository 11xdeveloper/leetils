// Scaffolds a new problem folder from LeetCode's problem list, then
// regenerates src/index.ts and the problem list.
// Usage: bun run new <number>
// Example: bun run new 125

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
	exportName,
	listProblems,
	PROBLEMS_DIR,
	problemFolder,
	problemUrl,
	readCatalogue,
	writeGeneratedFiles,
} from "./problems";

const number = Number(process.argv[2]);

if (!Number.isInteger(number) || number < 1) {
	console.error("Usage: bun run new <number>");
	console.error("Example: bun run new 125");
	process.exit(1);
}

const problem = readCatalogue().problems.find((p) => p.number === number);
if (!problem) {
	console.error(
		`Problem ${number} isn't in data/leetcode-problems.json. Run \`bun run sync\` to update it.`,
	);
	process.exit(1);
}

const existing = listProblems().find((p) => p.number === number);
if (existing) {
	console.error(`src/problems/${existing.folder} already exists`);
	process.exit(1);
}

const { title, slug, difficulty } = problem;
const folder = problemFolder(number, slug);
const dir = join(PROBLEMS_DIR, folder);
const name = exportName(slug);

mkdirSync(dir, { recursive: true });

writeFileSync(
	join(dir, "index.ts"),
	`/**
 * ${number}. ${title}
 *
 * TODO: Summarise the problem, then the approach.
 *
 * @see ${problemUrl(slug)}
 * @difficulty ${difficulty}
 * @timeComplexity TODO
 * @spaceComplexity TODO
 *
 * @example
 * ${name}(); // TODO
 */
export const ${name} = (): void => {
	throw new Error("Not implemented");
};
`,
);

writeFileSync(
	join(dir, "index.test.ts"),
	`import { describe, expect, it } from "bun:test";
import { ${name} } from ".";

describe(${JSON.stringify(`${number}. ${title}`)}, () => {
	it("solves the examples from the problem statement", () => {
		expect(${name}()).toEqual(undefined); // TODO
	});
});
`,
);

writeGeneratedFiles();

console.log(`Created src/problems/${folder} and exported ${name}.`);
console.log(`Problem: ${problemUrl(slug)}`);

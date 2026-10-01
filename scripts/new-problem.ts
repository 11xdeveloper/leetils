// Scaffolds a new problem folder from LeetCode's problem list, then
// regenerates src/index.ts and the problem list.
// Usage: bun run new <number> [--class]
// Example: bun run new 125
// Pass --class for design problems, whose solution is a class.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
	type ExportKind,
	exportName,
	inScope,
	listProblems,
	OUT_OF_SCOPE,
	PROBLEMS_DIR,
	problemFolder,
	problemUrl,
	readCatalogue,
	writeGeneratedFiles,
} from "./problems";

const args = process.argv.slice(2);
const kind: ExportKind = args.includes("--class") ? "class" : "function";
const number = Number(args.find((arg) => arg !== "--class"));

if (!Number.isInteger(number) || number < 1) {
	console.error("Usage: bun run new <number> [--class]");
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

if (!inScope(problem)) {
	console.error(
		`Problem ${number} is a ${OUT_OF_SCOPE[problem.category]} problem, which is out of scope.`,
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
const name = exportName(slug, kind);

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
 * ${kind === "class" ? `new ${name}()` : `${name}()`}; // TODO
 */
${
	kind === "class"
		? `export class ${name} {
	constructor() {
		throw new Error("Not implemented");
	}
}`
		: `export const ${name} = (): void => {
	throw new Error("Not implemented");
};`
}
`,
);

writeFileSync(
	join(dir, "index.test.ts"),
	`import { describe, expect, it } from "bun:test";
import { ${name} } from ".";

describe(${JSON.stringify(`${number}. ${title}`)}, () => {
	it("solves the examples from the problem statement", () => {
		${kind === "class" ? `expect(new ${name}()).toBeDefined();` : `expect(${name}()).toEqual(undefined);`} // TODO
	});
});
`,
);

writeGeneratedFiles();

console.log(`Created src/problems/${folder} and exported ${name}.`);
console.log(`Problem: ${problemUrl(slug)}`);

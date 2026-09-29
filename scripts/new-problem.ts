// Scaffolds a new problem folder and adds it to src/index.ts.
// Usage: bun run new <number> <slug>
// Example: bun run new 125 valid-palindrome

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
	exportName,
	listProblems,
	PROBLEMS_DIR,
	problemFolder,
	renderIndex,
	SLUG,
	SRC_DIR,
	titleFromSlug,
} from "./problems";

const [numberArg = "", slug = ""] = process.argv.slice(2);
const number = Number(numberArg);

if (
	!Number.isInteger(number) ||
	number < 1 ||
	number > 9999 ||
	!SLUG.test(slug)
) {
	console.error("Usage: bun run new <number> <slug>");
	console.error("Example: bun run new 125 valid-palindrome");
	process.exit(1);
}

const folder = problemFolder(number, slug);
const dir = join(PROBLEMS_DIR, folder);
const name = exportName(slug);

const existing = listProblems().find(
	(problem) => problem.number === number || problem.slug === slug,
);
if (existing) {
	console.error(`src/problems/${existing.folder} already exists`);
	process.exit(1);
}

mkdirSync(dir, { recursive: true });

writeFileSync(
	join(dir, "index.ts"),
	`/**
 * ${number}. ${titleFromSlug(slug)}
 *
 * TODO: Summarise the problem, then the approach.
 *
 * @see https://leetcode.com/problems/${slug}/
 * @difficulty TODO
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

describe("${number}. ${titleFromSlug(slug)}", () => {
	it("solves the examples from the problem statement", () => {
		expect(${name}()).toEqual(undefined); // TODO
	});
});
`,
);

writeFileSync(join(SRC_DIR, "index.ts"), renderIndex());

console.log(`Created src/problems/${folder} and exported ${name}.`);
console.log(
	"Fill in the TODOs, including the title if LeetCode's differs from the slug.",
);

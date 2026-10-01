// Checks the conventions every problem folder must follow (see README.md).

import { describe, expect, it } from "bun:test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
	listProblems,
	PROBLEM_PAGES_DIR,
	PROBLEMS_DIR,
	problemUrl,
	ROOT_DIR,
	readCatalogue,
	renderGeneratedFiles,
} from "../scripts/problems";

describe("generated files (run `bun run generate` to update)", () => {
	const files = renderGeneratedFiles();

	for (const [path, content] of files) {
		it(`${path} is up to date`, () => {
			expect(readFileSync(join(ROOT_DIR, path), "utf8")).toBe(content);
		});
	}

	it(`${PROBLEM_PAGES_DIR} has no stale pages`, () => {
		const pages = readdirSync(join(ROOT_DIR, PROBLEM_PAGES_DIR)).map(
			(file) => `${PROBLEM_PAGES_DIR}/${file}`,
		);
		expect(pages.filter((page) => !files.has(page))).toEqual([]);
	});
});

const catalogue = new Map(
	readCatalogue().problems.map((problem) => [problem.number, problem]),
);

for (const { folder, number, slug, exportName } of listProblems()) {
	describe(`src/problems/${folder}`, () => {
		const dir = join(PROBLEMS_DIR, folder);
		const source = readFileSync(join(dir, "index.ts"), "utf8");
		const leetcode = catalogue.get(number);

		it("matches LeetCode's number and slug", () => {
			expect(leetcode?.slug).toBe(slug);
		});

		it(`exports only ${exportName}`, async () => {
			const module = await import(join(dir, "index.ts"));
			expect(Object.keys(module)).toEqual([exportName]);
			expect(module[exportName]).toBeFunction();
		});

		it("starts its doc comment with the problem number and LeetCode's title", () => {
			expect(source).toContain(
				`/**\n * ${number}. ${leetcode?.title.trim()}\n`,
			);
		});

		it("links to the problem on LeetCode", () => {
			expect(source).toContain(`@see ${problemUrl(slug)}\n`);
		});

		it("states LeetCode's difficulty", () => {
			expect(source).toContain(`@difficulty ${leetcode?.difficulty}\n`);
		});

		it("states its time and space complexity", () => {
			expect(source).toMatch(/@timeComplexity O\(/);
			expect(source).toMatch(/@spaceComplexity O\(/);
		});

		it("has tests", () => {
			expect(existsSync(join(dir, "index.test.ts"))).toBeTrue();
		});
	});
}

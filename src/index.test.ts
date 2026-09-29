// Checks the conventions every problem folder must follow (see README.md).

import { describe, expect, it } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { listProblems, PROBLEMS_DIR, renderIndex } from "../scripts/problems";

describe("src/index.ts", () => {
	it("is up to date (run `bun run generate`)", () => {
		expect(readFileSync(join(import.meta.dirname, "index.ts"), "utf8")).toBe(
			renderIndex(),
		);
	});
});

for (const { folder, number, slug, exportName } of listProblems()) {
	describe(`src/problems/${folder}`, () => {
		const dir = join(PROBLEMS_DIR, folder);
		const source = readFileSync(join(dir, "index.ts"), "utf8");

		it(`exports only ${exportName}`, async () => {
			const module = await import(join(dir, "index.ts"));
			expect(Object.keys(module)).toEqual([exportName]);
			expect(module[exportName]).toBeFunction();
		});

		it("starts its doc comment with the problem number and title", () => {
			expect(source).toMatch(new RegExp(`/\\*\\*\\n \\* ${number}\\. \\S`));
		});

		it("links to the problem on LeetCode", () => {
			expect(source).toContain(`@see https://leetcode.com/problems/${slug}/\n`);
		});

		it("states its difficulty", () => {
			expect(source).toMatch(/@difficulty (Easy|Medium|Hard)\n/);
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

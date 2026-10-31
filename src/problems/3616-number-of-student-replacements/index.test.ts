import { describe, expect, it } from "bun:test";
import { numberOfStudentReplacements as totalReplacements } from ".";

describe("3616. Number of Student Replacements", () => {
	it("solves the examples from the problem statement", () => {
		expect(totalReplacements([4, 1, 2])).toBe(1);
		expect(totalReplacements([2, 2, 3])).toBe(0);
	});

	it("counts every improvement", () => {
		expect(totalReplacements([5, 4, 3, 2, 1])).toBe(4);
	});
});

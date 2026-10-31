import { describe, expect, it } from "bun:test";
import { countSubstringsThatSatisfyKConstraintI as countKConstraintSubstrings } from ".";

describe("3258. Count Substrings That Satisfy K-Constraint I", () => {
	it("solves the examples from the problem statement", () => {
		expect(countKConstraintSubstrings("10101", 1)).toBe(12);
		expect(countKConstraintSubstrings("1010101", 2)).toBe(25);
		expect(countKConstraintSubstrings("11111", 1)).toBe(15);
	});
});

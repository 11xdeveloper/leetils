import { describe, expect, it } from "bun:test";
import { letterCasePermutation } from ".";

describe("784. Letter Case Permutation", () => {
	it("solves the examples from the problem statement", () => {
		expect(letterCasePermutation("a1b2").sort()).toEqual([
			"A1B2",
			"A1b2",
			"a1B2",
			"a1b2",
		]);
		expect(letterCasePermutation("3z4").sort()).toEqual(["3Z4", "3z4"]);
	});

	it("gives 2^letters distinct strings for longer inputs", () => {
		const result = letterCasePermutation("aB3cD4eF");
		expect(new Set(result).size).toBe(64);
		for (const s of result) expect(s.toLowerCase()).toBe("ab3cd4ef");
	});
});

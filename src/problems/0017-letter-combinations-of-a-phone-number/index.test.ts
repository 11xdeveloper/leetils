import { describe, expect, it } from "bun:test";
import { letterCombinationsOfAPhoneNumber } from ".";

describe("17. Letter Combinations of a Phone Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(letterCombinationsOfAPhoneNumber("23")).toEqual([
			"ad",
			"ae",
			"af",
			"bd",
			"be",
			"bf",
			"cd",
			"ce",
			"cf",
		]);
		expect(letterCombinationsOfAPhoneNumber("2")).toEqual(["a", "b", "c"]);
	});

	it("returns nothing for an empty string", () => {
		expect(letterCombinationsOfAPhoneNumber("")).toEqual([]);
	});

	it("uses four letters for 7 and 9", () => {
		expect(letterCombinationsOfAPhoneNumber("7")).toEqual(["p", "q", "r", "s"]);
		expect(letterCombinationsOfAPhoneNumber("9")).toEqual(["w", "x", "y", "z"]);
	});

	it("returns every combination exactly once for the longest input", () => {
		const combinations = letterCombinationsOfAPhoneNumber("7979");
		expect(combinations).toHaveLength(4 ** 4);
		expect(new Set(combinations).size).toBe(combinations.length);
		expect(combinations).toContain("pwsz");
	});
});

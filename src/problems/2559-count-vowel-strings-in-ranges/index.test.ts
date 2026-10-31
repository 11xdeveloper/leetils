import { describe, expect, it } from "bun:test";
import { countVowelStringsInRanges as vowelStrings } from ".";

describe("2559. Count Vowel Strings in Ranges", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			vowelStrings(
				["aba", "bcb", "ece", "aa", "e"],
				[
					[0, 2],
					[1, 4],
					[1, 1],
				],
			),
		).toEqual([2, 3, 0]);
		expect(
			vowelStrings(
				["a", "e", "i"],
				[
					[0, 2],
					[0, 1],
					[2, 2],
				],
			),
		).toEqual([3, 2, 1]);
	});
});

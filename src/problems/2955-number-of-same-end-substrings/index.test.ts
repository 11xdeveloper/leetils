import { describe, expect, it } from "bun:test";
import { numberOfSameEndSubstrings as sameEndSubstringCount } from ".";

describe("2955. Number of Same-End Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			sameEndSubstringCount("abcaab", [
				[0, 0],
				[1, 4],
				[2, 5],
				[0, 5],
			]),
		).toEqual([1, 5, 5, 10]);
		expect(sameEndSubstringCount("abcd", [[0, 3]])).toEqual([4]);
	});
});

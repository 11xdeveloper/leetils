import { describe, expect, it } from "bun:test";
import { sumOfPrefixScoresOfStrings as sumPrefixScores } from ".";

describe("2416. Sum of Prefix Scores of Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumPrefixScores(["abc", "ab", "bc", "b"])).toEqual([5, 4, 3, 2]);
		expect(sumPrefixScores(["abcd"])).toEqual([4]);
	});
});

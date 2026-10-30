import { describe, expect, it } from "bun:test";
import { longestUnequalAdjacentGroupsSubsequenceI as getLongestSubsequence } from ".";

describe("2900. Longest Unequal Adjacent Groups Subsequence I", () => {
	it("solves the examples from the problem statement", () => {
		expect(getLongestSubsequence(["e", "a", "b"], [0, 0, 1])).toEqual([
			"e",
			"b",
		]);
		expect(getLongestSubsequence(["a", "b", "c", "d"], [1, 0, 1, 1])).toEqual([
			"a",
			"b",
			"c",
		]);
	});
});

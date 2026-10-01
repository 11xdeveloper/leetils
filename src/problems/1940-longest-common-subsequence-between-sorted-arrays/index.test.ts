import { describe, expect, it } from "bun:test";
import { longestCommonSubsequenceBetweenSortedArrays as longestCommonSubsequence } from ".";

describe("1940. Longest Common Subsequence Between Sorted Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			longestCommonSubsequence([
				[1, 3, 4],
				[1, 4, 7, 9],
			]),
		).toEqual([1, 4]);
		expect(
			longestCommonSubsequence([
				[2, 3, 6, 8],
				[1, 2, 3, 5, 6, 7, 10],
				[2, 3, 4, 6, 9],
			]),
		).toEqual([2, 3, 6]);
		expect(
			longestCommonSubsequence([
				[1, 2, 3, 4, 5],
				[6, 7, 8],
			]),
		).toEqual([]);
	});
});

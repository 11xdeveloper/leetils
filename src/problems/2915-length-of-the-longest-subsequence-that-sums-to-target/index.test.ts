import { describe, expect, it } from "bun:test";
import { lengthOfTheLongestSubsequenceThatSumsToTarget as lengthOfLongestSubsequence } from ".";

describe("2915. Length of the Longest Subsequence That Sums to Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(lengthOfLongestSubsequence([1, 2, 3, 4, 5], 9)).toBe(3);
		expect(lengthOfLongestSubsequence([4, 1, 3, 2, 1, 5], 7)).toBe(4);
		expect(lengthOfLongestSubsequence([1, 1, 5, 4, 5], 3)).toBe(-1);
	});
});

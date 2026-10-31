import { describe, expect, it } from "bun:test";
import { longestSubsequenceWithNonZeroBitwiseXor as longestSubsequence } from ".";

describe("3702. Longest Subsequence With Non-Zero Bitwise XOR", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestSubsequence([1, 2, 3])).toBe(2);
		expect(longestSubsequence([2, 3, 4])).toBe(3);
	});

	it("returns 0 when every element is 0", () => {
		expect(longestSubsequence([0, 0])).toBe(0);
	});
});

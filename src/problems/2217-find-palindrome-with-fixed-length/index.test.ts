import { describe, expect, it } from "bun:test";
import { findPalindromeWithFixedLength as kthPalindrome } from ".";

describe("2217. Find Palindrome With Fixed Length", () => {
	it("solves the examples from the problem statement", () => {
		expect(kthPalindrome([1, 2, 3, 4, 5, 90], 3)).toEqual([
			101, 111, 121, 131, 141, 999,
		]);
		expect(kthPalindrome([2, 4, 6], 4)).toEqual([1111, 1331, 1551]);
	});

	it("handles single digits and the longest palindromes", () => {
		expect(kthPalindrome([1, 9, 10], 1)).toEqual([1, 9, -1]);
		expect(kthPalindrome([1], 15)).toEqual([100_000_000_000_001]);
	});
});

import { describe, expect, it } from "bun:test";
import { maximumProductOfTheLengthOfTwoPalindromicSubsequences as maxPalindromeProduct } from ".";

describe("2002. Maximum Product of the Length of Two Palindromic Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxPalindromeProduct("leetcodecom")).toBe(9);
		expect(maxPalindromeProduct("bb")).toBe(1);
		expect(maxPalindromeProduct("accbcaxxcxx")).toBe(25);
	});

	it("handles strings of one repeated letter", () => {
		expect(maxPalindromeProduct("aaaaaaaaaaaa")).toBe(36);
		expect(maxPalindromeProduct("abc")).toBe(1);
	});
});

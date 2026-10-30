import { describe, expect, it } from "bun:test";
import { maximumNumberOfNonOverlappingPalindromeSubstrings as maxPalindromes } from ".";

describe("2472. Maximum Number of Non-overlapping Palindrome Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxPalindromes("abaccdbbd", 3)).toBe(2);
		expect(maxPalindromes("adbcda", 2)).toBe(0);
	});

	it("counts single letters when k is 1", () => {
		expect(maxPalindromes("abc", 1)).toBe(3);
	});
});

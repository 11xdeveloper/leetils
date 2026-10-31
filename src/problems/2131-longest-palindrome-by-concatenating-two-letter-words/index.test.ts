import { describe, expect, it } from "bun:test";
import { longestPalindromeByConcatenatingTwoLetterWords as longestPalindrome } from ".";

describe("2131. Longest Palindrome by Concatenating Two Letter Words", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestPalindrome(["lc", "cl", "gg"])).toBe(6);
		expect(longestPalindrome(["ab", "ty", "yt", "lc", "cl", "ab"])).toBe(8);
		expect(longestPalindrome(["cc", "ll", "xx"])).toBe(2);
	});

	it("pairs doubled words with each other", () => {
		expect(longestPalindrome(["gg", "gg", "gg"])).toBe(6);
	});
});

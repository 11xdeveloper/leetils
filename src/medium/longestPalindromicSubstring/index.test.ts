import { describe, expect, it } from "bun:test";
import { longestPalindrome } from "./index";

describe("longestPalindrome", () => {
	it("should return the longest palindromic substring", () => {
		expect(longestPalindrome("babad")).toBe("bab");
		expect(longestPalindrome("cbbd")).toBe("bb");
	});

	it("should handle single character strings", () => {
		expect(longestPalindrome("a")).toBe("a");
	});

	it("should handle empty strings", () => {
		expect(longestPalindrome("")).toBe("");
	});

	it("should handle strings with no palindromic substrings longer than 1", () => {
		expect(longestPalindrome("abc")).toBe("a");
	});

	it("should handle strings with multiple palindromic substrings of same length", () => {
		const result = longestPalindrome("babad");
		expect(["bab", "aba"]).toContain(result);
	});

	it("should handle strings with all same characters", () => {
		expect(longestPalindrome("aaaa")).toBe("aaaa");
	});
});

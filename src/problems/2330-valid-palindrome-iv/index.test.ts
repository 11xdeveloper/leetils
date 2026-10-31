import { describe, expect, it } from "bun:test";
import { validPalindromeIV as makePalindrome } from ".";

describe("2330. Valid Palindrome IV", () => {
	it("solves the examples from the problem statement", () => {
		expect(makePalindrome("abcdba")).toBeTrue();
		expect(makePalindrome("aa")).toBeTrue();
		expect(makePalindrome("abcdef")).toBeFalse();
	});
});

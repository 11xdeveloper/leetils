import { describe, expect, it } from "bun:test";
import { lexicographicallySmallestPalindrome as makeSmallestPalindrome } from ".";

describe("2697. Lexicographically Smallest Palindrome", () => {
	it("solves the examples from the problem statement", () => {
		expect(makeSmallestPalindrome("egcfe")).toBe("efcfe");
		expect(makeSmallestPalindrome("abcd")).toBe("abba");
		expect(makeSmallestPalindrome("seven")).toBe("neven");
	});
});

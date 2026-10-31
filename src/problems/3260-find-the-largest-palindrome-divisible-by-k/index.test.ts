import { describe, expect, it } from "bun:test";
import { findTheLargestPalindromeDivisibleByK as largestPalindrome } from ".";

/** Counts down through the n-digit numbers. */
const byBruteForce = (n: number, k: number): string => {
	for (let x = 10 ** n - 1; x >= 10 ** (n - 1); x--) {
		const s = String(x);
		if (x % k === 0 && s === [...s].reverse().join("")) return s;
	}
	return "";
};

describe("3260. Find the Largest Palindrome Divisible by K", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestPalindrome(3, 5)).toBe("595");
		expect(largestPalindrome(1, 4)).toBe("8");
		expect(largestPalindrome(5, 6)).toBe("89898");
	});

	it("matches counting down for small n", () => {
		for (let n = 1; n <= 5; n++)
			for (let k = 1; k <= 9; k++)
				expect(largestPalindrome(n, k)).toBe(byBruteForce(n, k));
	});

	it("handles 10^5 digits", () => {
		const result = largestPalindrome(100000, 7);
		expect(result).toHaveLength(100000);
		expect(BigInt(result) % 7n).toBe(0n);
	});
});

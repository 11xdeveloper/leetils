import { describe, expect, it } from "bun:test";
import { largestPalindromeProduct } from ".";

/** Checks every pair of n-digit numbers. */
const byBruteForce = (n: number): number => {
	let best = 0;
	for (let a = 10 ** (n - 1); a < 10 ** n; a++) {
		for (let b = a; b < 10 ** n; b++) {
			const product = a * b;
			if (
				product > best &&
				String(product) === [...String(product)].reverse().join("")
			)
				best = product;
		}
	}
	return best % 1337;
};

describe("479. Largest Palindrome Product", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestPalindromeProduct(2)).toBe(987);
		expect(largestPalindromeProduct(1)).toBe(9);
	});

	it("matches checking every pair for up to 3 digits", () => {
		for (let n = 1; n <= 3; n++)
			expect(largestPalindromeProduct(n)).toBe(byBruteForce(n));
	});

	it("gives the known answers up to 8 digits", () => {
		expect([4, 5, 6, 7, 8].map(largestPalindromeProduct)).toEqual([
			597, 677, 1218, 877, 475,
		]);
	});
});

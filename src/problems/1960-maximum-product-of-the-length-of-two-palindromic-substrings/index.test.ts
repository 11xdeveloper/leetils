import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumProductOfTheLengthOfTwoPalindromicSubstrings as maxProduct } from ".";

/** Checks every pair of odd-length palindromic substrings. */
const byBruteForce = (s: string): number => {
	const palindromes: [number, number][] = [];
	for (let i = 0; i < s.length; i++) {
		for (let j = i; j < s.length; j += 2) {
			const sub = s.slice(i, j + 1);
			if (sub === [...sub].reverse().join("")) palindromes.push([i, j]);
		}
	}
	let best = 0;
	for (const [a, b] of palindromes)
		for (const [c, d] of palindromes)
			if (b < c) best = Math.max(best, (b - a + 1) * (d - c + 1));
	return best;
};

describe("1960. Maximum Product of the Length of Two Palindromic Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxProduct("ababbb")).toBe(9);
		expect(maxProduct("zaaaxbbby")).toBe(9);
	});

	it("matches checking every pair of palindromes on random strings", () => {
		const random = createRandom(1960);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(2, 14), "ab");
			expect(maxProduct(s)).toBe(byBruteForce(s));
		}
	});
});

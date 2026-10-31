import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestAlmostPalindromicSubstring as almostPalindromic } from ".";

/** Tries every substring and every deletion. */
const byBruteForce = (s: string): number => {
	const isPalindrome = (t: string) => t === [...t].reverse().join("");
	let best = 0;
	for (let i = 0; i < s.length; i++)
		for (let j = i + 1; j <= s.length; j++) {
			const t = s.slice(i, j);
			for (let k = 0; k < t.length; k++)
				if (isPalindrome(t.slice(0, k) + t.slice(k + 1)))
					best = Math.max(best, t.length);
		}
	return best;
};

describe("3844. Longest Almost-Palindromic Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(almostPalindromic("abca")).toBe(4);
		expect(almostPalindromic("abba")).toBe(4);
		expect(almostPalindromic("zzabba")).toBe(5);
	});

	it("matches trying every deletion on random strings", () => {
		const random = createRandom(3844);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(2, 12), "abc");
			expect(almostPalindromic(s)).toBe(byBruteForce(s));
		}
	});
});

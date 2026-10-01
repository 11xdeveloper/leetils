import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizePalindromeLengthFromSubsequences as longestPalindrome } from ".";

/** Tries every pair of non-empty subsequences. */
const byBruteForce = (a: string, b: string): number => {
	let best = 0;
	for (let x = 1; x < 1 << a.length; x++) {
		for (let y = 1; y < 1 << b.length; y++) {
			const s =
				[...a].filter((_, i) => x & (1 << i)).join("") +
				[...b].filter((_, i) => y & (1 << i)).join("");
			if (s === [...s].reverse().join("")) best = Math.max(best, s.length);
		}
	}
	return best;
};

describe("1771. Maximize Palindrome Length From Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestPalindrome("cacb", "cbba")).toBe(5);
		expect(longestPalindrome("ab", "ab")).toBe(3);
		expect(longestPalindrome("aa", "bb")).toBe(0);
	});

	it("matches trying every pair of subsequences on random inputs", () => {
		const random = createRandom(1771);
		for (let run = 0; run < 150; run++) {
			const [a, b] = [
				random.string(random.int(1, 6), "abc"),
				random.string(random.int(1, 6), "abc"),
			];
			expect(longestPalindrome(a, b)).toBe(byBruteForce(a, b));
		}
	});
});

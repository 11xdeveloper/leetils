import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestPalindromicSubsequence } from ".";

const byBruteForce = (s: string): number => {
	let best = 0;
	for (let mask = 1; mask < 1 << s.length; mask++) {
		const chosen = [...s].filter((_, i) => mask & (1 << i)).join("");
		if (chosen === [...chosen].reverse().join(""))
			best = Math.max(best, chosen.length);
	}
	return best;
};

describe("516. Longest Palindromic Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestPalindromicSubsequence("bbbab")).toBe(4);
		expect(longestPalindromicSubsequence("cbbd")).toBe(2);
	});

	it("matches trying every subsequence on random inputs", () => {
		const random = createRandom(516);
		for (let run = 0; run < 500; run++) {
			const s = random.string(random.int(1, 12), "abc");
			expect(longestPalindromicSubsequence(s)).toBe(byBruteForce(s));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countDifferentPalindromicSubsequences as countPalindromicSubsequences } from ".";

const byBruteForce = (s: string): number => {
	const found = new Set<string>();
	for (let mask = 1; mask < 1 << s.length; mask++) {
		const chosen = [...s].filter((_, i) => mask & (1 << i)).join("");
		if (chosen === [...chosen].reverse().join("")) found.add(chosen);
	}
	return found.size;
};

describe("730. Count Different Palindromic Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPalindromicSubsequences("bccb")).toBe(6);
		expect(
			countPalindromicSubsequences(
				"abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba",
			),
		).toBe(104860361);
	});

	it("matches collecting every palindromic subsequence on random strings", () => {
		const random = createRandom(730);
		for (let run = 0; run < 500; run++) {
			const s = random.string(random.int(1, 12), "abcd");
			expect(countPalindromicSubsequences(s)).toBe(byBruteForce(s));
		}
	});
});

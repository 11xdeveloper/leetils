import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestPalindromicSubsequenceII as longestPalindromeSubseq } from ".";

/** Checks every subsequence. */
const byBruteForce = (s: string): number => {
	let longest = 0;
	for (let mask = 1; mask < 1 << s.length; mask++) {
		const sub = [...s].filter((_, i) => mask & (1 << i));
		const m = sub.length;
		if (m % 2 === 1 || sub.join("") !== sub.toReversed().join("")) continue;
		if (sub.some((c, i) => i > 0 && i !== m / 2 && c === sub[i - 1])) continue;
		longest = Math.max(longest, m);
	}
	return longest;
};

describe("1682. Longest Palindromic Subsequence II", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestPalindromeSubseq("bbabab")).toBe(4);
		expect(longestPalindromeSubseq("dcbccacdb")).toBe(4);
	});

	it("matches checking every subsequence on random strings", () => {
		const random = createRandom(1682);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 12), "abc");
			expect(longestPalindromeSubseq(s)).toBe(byBruteForce(s));
		}
	});

	it("handles 250 characters", () => {
		expect(longestPalindromeSubseq("ab".repeat(125))).toBeGreaterThan(0);
	});
});

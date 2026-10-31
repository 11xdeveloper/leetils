import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestPalindromicSubsequenceAfterAtMostKOperations as longestPalindromicSubsequence } from ".";

/** Memoised recursion over ranges and budgets. */
const byBruteForce = (s: string, k: number): number => {
	const memo = new Map<string, number>();
	const best = (i: number, j: number, b: number): number => {
		if (i > j) return 0;
		if (i === j) return 1;
		const key = `${i},${j},${b}`;
		const cached = memo.get(key);
		if (cached !== undefined) return cached;
		const gap = Math.abs(s.charCodeAt(i) - s.charCodeAt(j));
		const cost = Math.min(gap, 26 - gap);
		let result = Math.max(best(i + 1, j, b), best(i, j - 1, b));
		if (cost <= b) result = Math.max(result, 2 + best(i + 1, j - 1, b - cost));
		memo.set(key, result);
		return result;
	};
	return best(0, s.length - 1, k);
};

describe("3472. Longest Palindromic Subsequence After at Most K Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestPalindromicSubsequence("abced", 2)).toBe(3);
		expect(longestPalindromicSubsequence("aaazzz", 4)).toBe(6);
	});

	it("matches memoised recursion on random strings", () => {
		const random = createRandom(3472);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 12), "abyz");
			const k = random.int(0, 4);
			expect(longestPalindromicSubsequence(s, k)).toBe(byBruteForce(s, k));
		}
	});
});

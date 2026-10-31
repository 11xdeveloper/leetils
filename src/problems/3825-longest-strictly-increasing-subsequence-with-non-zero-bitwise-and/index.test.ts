import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestStrictlyIncreasingSubsequenceWithNonZeroBitwiseAnd as longestSubsequence } from ".";

/** Tries every subsequence. */
const byBruteForce = (nums: number[]): number => {
	let best = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const picked = nums.filter((_, i) => (mask >> i) & 1);
		if (
			picked.every((x, i) => i === 0 || x > (picked[i - 1] ?? 0)) &&
			picked.reduce((a, b) => a & b) !== 0
		)
			best = Math.max(best, picked.length);
	}
	return best;
};

describe("3825. Longest Strictly Increasing Subsequence With Non-Zero Bitwise AND", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestSubsequence([5, 4, 7])).toBe(2);
		expect(longestSubsequence([2, 3, 6])).toBe(3);
		expect(longestSubsequence([0, 1])).toBe(1);
	});

	it("matches trying every subsequence on random arrays", () => {
		const random = createRandom(3825);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 0, 15);
			expect(longestSubsequence(nums)).toBe(byBruteForce(nums));
		}
	});
});

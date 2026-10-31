import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestSubsequenceWithDecreasingAdjacentDifference as longestSubsequence } from ".";

/** Checks every subsequence. */
const byBruteForce = (nums: number[]): number => {
	let best = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const sub = nums.filter((_, i) => (mask >> i) & 1);
		const diffs = sub.slice(1).map((v, i) => Math.abs(v - (sub[i] ?? 0)));
		if (diffs.every((d, i) => i === 0 || d <= (diffs[i - 1] ?? 0)))
			best = Math.max(best, sub.length);
	}
	return best;
};

describe("3409. Longest Subsequence With Decreasing Adjacent Difference", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestSubsequence([16, 6, 3])).toBe(3);
		expect(longestSubsequence([6, 5, 3, 4, 2, 1])).toBe(4);
		expect(longestSubsequence([10, 20, 10, 19, 10, 20])).toBe(5);
	});

	it("matches checking every subsequence on random arrays", () => {
		const random = createRandom(3409);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 11), 1, 10);
			expect(longestSubsequence(nums)).toBe(byBruteForce(nums));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestIncreasingSubsequenceII as lengthOfLIS } from ".";

/** Quadratic DP. */
const byBruteForce = (nums: number[], k: number): number => {
	const best = nums.map(() => 1);
	for (let i = 0; i < nums.length; i++)
		for (let j = 0; j < i; j++) {
			const gap = (nums[i] ?? 0) - (nums[j] ?? 0);
			if (gap > 0 && gap <= k)
				best[i] = Math.max(best[i] ?? 1, (best[j] ?? 1) + 1);
		}
	return Math.max(...best);
};

describe("2407. Longest Increasing Subsequence II", () => {
	it("solves the examples from the problem statement", () => {
		expect(lengthOfLIS([4, 2, 1, 4, 3, 4, 5, 8, 15], 3)).toBe(5);
		expect(lengthOfLIS([7, 4, 5, 1, 8, 12, 4, 7], 5)).toBe(4);
		expect(lengthOfLIS([1, 5], 1)).toBe(1);
	});

	it("matches a quadratic DP on random inputs", () => {
		const random = createRandom(2407);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 15);
			const k = random.int(1, 5);
			expect(lengthOfLIS(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});

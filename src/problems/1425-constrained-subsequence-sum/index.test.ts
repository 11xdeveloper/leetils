import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { constrainedSubsequenceSum as constrainedSubsetSum } from ".";

/** Tries every non-empty subsequence. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = -Infinity;
	for (let mask = 1; mask < 2 ** nums.length; mask++) {
		const indices = nums.map((_, i) => i).filter((i) => mask & (1 << i));
		if (indices.some((index, j) => j > 0 && index - (indices[j - 1] ?? 0) > k))
			continue;
		best = Math.max(
			best,
			indices.reduce((s, i) => s + (nums[i] ?? 0), 0),
		);
	}
	return best;
};

describe("1425. Constrained Subsequence Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(constrainedSubsetSum([10, 2, -10, 5, 20], 2)).toBe(37);
		expect(constrainedSubsetSum([-1, -2, -3], 1)).toBe(-1);
		expect(constrainedSubsetSum([10, -2, -10, -5, 20], 2)).toBe(23);
	});

	it("matches trying every subsequence on random inputs", () => {
		const random = createRandom(1425);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), -10, 10);
			const k = random.int(1, nums.length);
			expect(constrainedSubsetSum(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSumOfAlternatingSubsequenceWithDistanceAtLeastK as maxAlternatingSum } from ".";

/** Tries every subsequence. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const idx = Array.from({ length: nums.length }, (_, i) => i).filter(
			(i) => (mask >> i) & 1,
		);
		if (idx.some((x, t) => t > 0 && x - (idx[t - 1] ?? 0) < k)) continue;
		const vals = idx.map((i) => nums[i] ?? 0);
		let ok = true;
		for (let t = 1; t < vals.length; t++) {
			const s = Math.sign((vals[t] ?? 0) - (vals[t - 1] ?? 0));
			if (
				s === 0 ||
				(t > 1 && s === Math.sign((vals[t - 1] ?? 0) - (vals[t - 2] ?? 0)))
			)
				ok = false;
		}
		if (ok)
			best = Math.max(
				best,
				vals.reduce((a, b) => a + b, 0),
			);
	}
	return best;
};

describe("3915. Maximum Sum of Alternating Subsequence With Distance at Least K", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxAlternatingSum([5, 4, 2], 2)).toBe(7);
		expect(maxAlternatingSum([3, 5, 4, 2, 4], 1)).toBe(14);
		expect(maxAlternatingSum([5], 1)).toBe(5);
	});

	it("matches trying every subsequence on random arrays", () => {
		const random = createRandom(3915);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 6);
			const k = random.int(1, nums.length);
			expect(maxAlternatingSum(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});

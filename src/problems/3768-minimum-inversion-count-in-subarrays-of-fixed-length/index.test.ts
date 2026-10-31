import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumInversionCountInSubarraysOfFixedLength as minInversionCount } from ".";

/** Counts each window's inversions directly. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = Number.POSITIVE_INFINITY;
	for (let s = 0; s + k <= nums.length; s++) {
		let count = 0;
		for (let i = s; i < s + k; i++)
			for (let j = i + 1; j < s + k; j++)
				if ((nums[i] ?? 0) > (nums[j] ?? 0)) count++;
		best = Math.min(best, count);
	}
	return best;
};

describe("3768. Minimum Inversion Count in Subarrays of Fixed Length", () => {
	it("solves the examples from the problem statement", () => {
		expect(minInversionCount([3, 1, 2, 5, 4], 3)).toBe(0);
		expect(minInversionCount([5, 3, 2, 1], 4)).toBe(6);
		expect(minInversionCount([2, 1], 1)).toBe(0);
	});

	it("matches counting each window on random arrays", () => {
		const random = createRandom(3768);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 6);
			const k = random.int(1, nums.length);
			expect(minInversionCount(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});

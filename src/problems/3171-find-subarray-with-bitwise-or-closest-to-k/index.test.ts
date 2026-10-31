import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findSubarrayWithBitwiseOrClosestToK as minimumDifference } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = Number.POSITIVE_INFINITY;
	for (let i = 0; i < nums.length; i++) {
		let or = 0;
		for (let j = i; j < nums.length; j++) {
			or |= nums[j] ?? 0;
			best = Math.min(best, Math.abs(k - or));
		}
	}
	return best;
};

describe("3171. Find Subarray With Bitwise OR Closest to K", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumDifference([1, 2, 4, 5], 3)).toBe(0);
		expect(minimumDifference([1, 3, 1, 3], 2)).toBe(1);
		expect(minimumDifference([1], 10)).toBe(9);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3171);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 40);
			const k = random.int(1, 70);
			expect(minimumDifference(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});

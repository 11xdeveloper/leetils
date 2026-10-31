import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumLengthOfSemiDecreasingSubarrays as maxSubarrayLength } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[]): number => {
	let best = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j < nums.length; j++)
			if ((nums[i] ?? 0) > (nums[j] ?? 0)) best = Math.max(best, j - i + 1);
	return best;
};

describe("2863. Maximum Length of Semi-Decreasing Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSubarrayLength([7, 6, 5, 4, 3, 2, 1, 6, 10, 11])).toBe(8);
		expect(
			maxSubarrayLength([57, 55, 50, 60, 61, 58, 63, 59, 64, 60, 63]),
		).toBe(6);
		expect(maxSubarrayLength([1, 2, 3, 4])).toBe(0);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(2863);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 6);
			expect(maxSubarrayLength(nums)).toBe(byBruteForce(nums));
		}
	});
});

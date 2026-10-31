import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumAndMinimumSumsOfAtMostSizeKSubarrays as minMaxSubarraySum } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[], k: number): number => {
	let total = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i; j < nums.length && j - i < k; j++) {
			const sub = nums.slice(i, j + 1);
			total += Math.max(...sub) + Math.min(...sub);
		}
	return total;
};

describe("3430. Maximum and Minimum Sums of at Most Size K Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMaxSubarraySum([1, 2, 3], 2)).toBe(20);
		expect(minMaxSubarraySum([1, -3, 1], 2)).toBe(-6);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3430);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), -4, 4);
			const k = random.int(1, nums.length);
			expect(minMaxSubarraySum(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});

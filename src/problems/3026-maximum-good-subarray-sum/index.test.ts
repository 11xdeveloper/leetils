import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumGoodSubarraySum } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = Number.NEGATIVE_INFINITY;
	for (let i = 0; i < nums.length; i++) {
		let sum = 0;
		for (let j = i; j < nums.length; j++) {
			sum += nums[j] ?? 0;
			if (j > i && Math.abs((nums[i] ?? 0) - (nums[j] ?? 0)) === k)
				best = Math.max(best, sum);
		}
	}
	return best === Number.NEGATIVE_INFINITY ? 0 : best;
};

describe("3026. Maximum Good Subarray Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumGoodSubarraySum([1, 2, 3, 4, 5, 6], 1)).toBe(11);
		expect(maximumGoodSubarraySum([-1, 3, 2, 4, 5], 3)).toBe(11);
		expect(maximumGoodSubarraySum([-1, -2, -3, -4], 2)).toBe(-6);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3026);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(2, 10), -5, 5);
			const k = random.int(1, 4);
			expect(maximumGoodSubarraySum(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});

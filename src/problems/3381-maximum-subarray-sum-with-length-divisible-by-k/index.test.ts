import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSubarraySumWithLengthDivisibleByK as maxSubarraySum } from ".";

describe("3381. Maximum Subarray Sum With Length Divisible by K", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSubarraySum([1, 2], 1)).toBe(3);
		expect(maxSubarraySum([-1, -2, -3, -4, -5], 4)).toBe(-10);
		expect(maxSubarraySum([-5, 1, 2, -3, 4], 2)).toBe(4);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3381);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), -5, 5);
			const k = random.int(1, nums.length);
			let best = Number.NEGATIVE_INFINITY;
			for (let i = 0; i < nums.length; i++) {
				let sum = 0;
				for (let j = i; j < nums.length; j++) {
					sum += nums[j] ?? 0;
					if ((j - i + 1) % k === 0) best = Math.max(best, sum);
				}
			}
			expect(maxSubarraySum(nums, k)).toBe(best);
		}
	});
});

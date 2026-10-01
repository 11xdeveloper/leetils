import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { continuousSubarraySum as checkSubarraySum } from ".";

const byBruteForce = (nums: number[], k: number): boolean => {
	for (let i = 0; i < nums.length; i++) {
		let sum = nums[i] ?? 0;
		for (let j = i + 1; j < nums.length; j++) {
			sum += nums[j] ?? 0;
			if (sum % k === 0) return true;
		}
	}
	return false;
};

describe("523. Continuous Subarray Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkSubarraySum([23, 2, 4, 6, 7], 6)).toBeTrue();
		expect(checkSubarraySum([23, 2, 6, 4, 7], 6)).toBeTrue();
		expect(checkSubarraySum([23, 2, 6, 4, 7], 13)).toBeFalse();
	});

	it("needs at least two elements", () => {
		expect(checkSubarraySum([6], 6)).toBeFalse();
		expect(checkSubarraySum([0, 0], 1)).toBeTrue();
		expect(checkSubarraySum([5, 0, 3], 7)).toBeFalse();
	});

	it("matches summing every subarray on random inputs", () => {
		const random = createRandom(523);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 10), 0, 10);
			const k = random.int(1, 15);
			expect(checkSubarraySum(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { subarraySumEqualsK as subarraySum } from ".";

const byBruteForce = (nums: number[], k: number): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		let sum = 0;
		for (let j = i; j < nums.length; j++) {
			sum += nums[j] ?? 0;
			if (sum === k) count++;
		}
	}
	return count;
};

describe("560. Subarray Sum Equals K", () => {
	it("solves the examples from the problem statement", () => {
		expect(subarraySum([1, 1, 1], 2)).toBe(2);
		expect(subarraySum([1, 2, 3], 3)).toBe(2);
	});

	it("matches summing every subarray on random inputs", () => {
		const random = createRandom(560);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 15), -3, 3);
			const k = random.int(-4, 4);
			expect(subarraySum(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});

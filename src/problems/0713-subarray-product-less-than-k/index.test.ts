import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { subarrayProductLessThanK as numSubarrayProductLessThanK } from ".";

const byBruteForce = (nums: number[], k: number): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		let product = 1;
		for (let j = i; j < nums.length; j++) {
			product *= nums[j] ?? 1;
			if (product < k) count++;
		}
	}
	return count;
};

describe("713. Subarray Product Less Than K", () => {
	it("solves the examples from the problem statement", () => {
		expect(numSubarrayProductLessThanK([10, 5, 2, 6], 100)).toBe(8);
		expect(numSubarrayProductLessThanK([1, 2, 3], 0)).toBe(0);
	});

	it("matches multiplying every subarray on random inputs", () => {
		const random = createRandom(713);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 12), 1, 10);
			const k = random.int(0, 200);
			expect(numSubarrayProductLessThanK(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});

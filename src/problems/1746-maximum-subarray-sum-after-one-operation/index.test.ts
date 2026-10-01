import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSubarraySumAfterOneOperation as maxSumAfterOperation } from ".";

/** Tries every subarray and every element in it to square. */
const byBruteForce = (nums: number[]): number => {
	let best = -Infinity;
	for (let i = 0; i < nums.length; i++) {
		for (let j = i; j < nums.length; j++) {
			const sum = nums.slice(i, j + 1).reduce((s, num) => s + num, 0);
			for (let k = i; k <= j; k++)
				best = Math.max(best, sum - (nums[k] ?? 0) + (nums[k] ?? 0) ** 2);
		}
	}
	return best;
};

describe("1746. Maximum Subarray Sum After One Operation", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSumAfterOperation([2, -1, -4, -3])).toBe(17);
		expect(maxSumAfterOperation([1, -1, 1, 1, -1, -1, 1])).toBe(4);
	});

	it("matches trying every subarray on random inputs", () => {
		const random = createRandom(1746);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), -5, 5);
			expect(maxSumAfterOperation(nums)).toBe(byBruteForce(nums));
		}
	});
});

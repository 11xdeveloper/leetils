import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumAverageSubarrayII as findMaxAverage } from ".";

const byBruteForce = (nums: number[], k: number): number => {
	let best = Number.NEGATIVE_INFINITY;
	for (let i = 0; i < nums.length; i++) {
		let sum = 0;
		for (let j = i; j < nums.length; j++) {
			sum += nums[j] ?? 0;
			if (j - i + 1 >= k) best = Math.max(best, sum / (j - i + 1));
		}
	}
	return best;
};

describe("644. Maximum Average Subarray II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			Math.abs(findMaxAverage([1, 12, -5, -6, 50, 3], 4) - 12.75),
		).toBeLessThan(1e-5);
		expect(Math.abs(findMaxAverage([5], 1) - 5)).toBeLessThan(1e-5);
	});

	it("matches averaging every long enough subarray on random inputs", () => {
		const random = createRandom(644);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 15), -10_000, 10_000);
			const k = random.int(1, nums.length);
			expect(
				Math.abs(findMaxAverage(nums, k) - byBruteForce(nums, k)),
			).toBeLessThan(1e-5);
		}
	});
});

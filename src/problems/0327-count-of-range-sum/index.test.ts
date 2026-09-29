import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countOfRangeSum } from ".";

const byBruteForce = (nums: number[], lower: number, upper: number): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		let sum = 0;
		for (let j = i; j < nums.length; j++) {
			sum += nums[j] ?? 0;
			if (sum >= lower && sum <= upper) count++;
		}
	}
	return count;
};

describe("327. Count of Range Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(countOfRangeSum([-2, 5, -1], -2, 2)).toBe(3);
		expect(countOfRangeSum([0], 0, 0)).toBe(1);
	});

	it("handles sums beyond the 32-bit range", () => {
		expect(
			countOfRangeSum([2 ** 31 - 1, 2 ** 31 - 1], 2 ** 32 - 2, 2 ** 33),
		).toBe(1);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(327);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 20), -10, 10);
			const lower = random.int(-15, 10);
			const upper = lower + random.int(0, 10);
			expect(countOfRangeSum(nums, lower, upper)).toBe(
				byBruteForce(nums, lower, upper),
			);
		}
	});
});

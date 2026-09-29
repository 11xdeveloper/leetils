import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSubarray } from ".";

const byBruteForce = (nums: number[]): number => {
	let best = Number.NEGATIVE_INFINITY;
	for (let i = 0; i < nums.length; i++) {
		let sum = 0;
		for (let j = i; j < nums.length; j++) {
			sum += nums[j] ?? 0;
			best = Math.max(best, sum);
		}
	}
	return best;
};

describe("53. Maximum Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
		expect(maximumSubarray([1])).toBe(1);
		expect(maximumSubarray([5, 4, -1, 7, 8])).toBe(23);
	});

	it("returns the largest element when every element is negative", () => {
		expect(maximumSubarray([-3, -1, -2])).toBe(-1);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(53);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 20), -10, 10);
			expect(maximumSubarray(nums)).toBe(byBruteForce(nums));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumProductOfFirstAndLastElementsOfASubsequence as maximumProduct } from ".";

/** Tries every pair of ends. */
const byBruteForce = (nums: number[], m: number): number => {
	let best = Number.NEGATIVE_INFINITY;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + m - 1; j < nums.length; j++)
			best = Math.max(best, (nums[i] ?? 0) * (nums[j] ?? 0));
	return best;
};

describe("3584. Maximum Product of First and Last Elements of a Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumProduct([-1, -9, 2, 3, -2, -3, 1], 1)).toBe(81);
		expect(maximumProduct([1, 3, -5, 5, 6, -4], 3)).toBe(20);
		expect(maximumProduct([2, -1, 2, -6, 5, 2, -5, 7], 2)).toBe(35);
	});

	it("matches trying every pair on random arrays", () => {
		const random = createRandom(3584);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), -9, 9);
			const m = random.int(1, nums.length);
			expect(maximumProduct(nums, m)).toBe(byBruteForce(nums, m));
		}
	});
});

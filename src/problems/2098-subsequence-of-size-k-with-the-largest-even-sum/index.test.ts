import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { subsequenceOfSizeKWithTheLargestEvenSum as largestEvenSum } from ".";

/** Tries every subset of size k. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = -1;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		const chosen = nums.filter((_, i) => mask & (1 << i));
		if (chosen.length !== k) continue;
		const sum = chosen.reduce((total, v) => total + v, 0);
		if (sum % 2 === 0) best = Math.max(best, sum);
	}
	return best;
};

describe("2098. Subsequence of Size K With the Largest Even Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestEvenSum([4, 1, 5, 3, 1], 3)).toBe(12);
		expect(largestEvenSum([4, 6, 2], 3)).toBe(12);
		expect(largestEvenSum([1, 3, 5], 1)).toBe(-1);
	});

	it("matches trying every subset on random inputs", () => {
		const random = createRandom(2098);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 0, 20);
			const k = random.int(1, nums.length);
			expect(largestEvenSum(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});

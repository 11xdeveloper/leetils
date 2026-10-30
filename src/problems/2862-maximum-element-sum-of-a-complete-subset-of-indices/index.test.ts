import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumElementSumOfACompleteSubsetOfIndices as maximumSum } from ".";

/** Tries every subset of indices. */
const byBruteForce = (nums: number[]): number => {
	const square = (x: number): boolean => Number.isInteger(Math.sqrt(x));
	let best = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const indices = nums
			.map((_, i) => i + 1)
			.filter((i) => (mask >> (i - 1)) & 1);
		if (indices.every((a) => indices.every((b) => square(a * b))))
			best = Math.max(
				best,
				indices.reduce((s, i) => s + (nums[i - 1] ?? 0), 0),
			);
	}
	return best;
};

describe("2862. Maximum Element-Sum of a Complete Subset of Indices", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumSum([8, 7, 3, 5, 7, 2, 4, 9])).toBe(16);
		expect(maximumSum([8, 10, 3, 8, 1, 13, 7, 9, 4])).toBe(20);
	});

	it("matches trying every subset on random inputs", () => {
		const random = createRandom(2862);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 12), 1, 20);
			expect(maximumSum(nums)).toBe(byBruteForce(nums));
		}
	});
});

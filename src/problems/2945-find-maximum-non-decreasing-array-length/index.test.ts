import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findMaximumNonDecreasingArrayLength as findMaximumLength } from ".";

/** Tries every way of cutting the array. */
const byBruteForce = (nums: number[]): number => {
	let best = 1;
	for (let mask = 0; mask < 1 << (nums.length - 1); mask++) {
		const sums: number[] = [nums[0] ?? 0];
		for (let i = 1; i < nums.length; i++) {
			if ((mask >> (i - 1)) & 1) sums.push(nums[i] ?? 0);
			else sums[sums.length - 1] = (sums.at(-1) ?? 0) + (nums[i] ?? 0);
		}
		if (sums.every((s, i) => i === 0 || s >= (sums[i - 1] ?? 0)))
			best = Math.max(best, sums.length);
	}
	return best;
};

describe("2945. Find Maximum Non-decreasing Array Length", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMaximumLength([5, 2, 2])).toBe(1);
		expect(findMaximumLength([1, 2, 3, 4])).toBe(4);
		expect(findMaximumLength([4, 3, 2, 6])).toBe(3);
	});

	it("matches trying every cut on random inputs", () => {
		const random = createRandom(2945);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 10);
			expect(findMaximumLength(nums)).toBe(byBruteForce(nums));
		}
	});
});

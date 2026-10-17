import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { partitionArrayIntoTwoArraysToMinimizeSumDifference as minimumDifference } from ".";

/** Tries every way to pick half of the numbers. */
const byBruteForce = (nums: number[]): number => {
	const total = nums.reduce((sum, v) => sum + v, 0);
	let best = Infinity;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		let [sum, size] = [0, 0];
		for (const [i, num] of nums.entries()) {
			if (mask & (1 << i)) [sum, size] = [sum + num, size + 1];
		}
		if (2 * size === nums.length)
			best = Math.min(best, Math.abs(total - 2 * sum));
	}
	return best;
};

describe("2035. Partition Array Into Two Arrays to Minimize Sum Difference", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumDifference([3, 9, 7, 3])).toBe(2);
		expect(minimumDifference([-36, 36])).toBe(72);
		expect(minimumDifference([2, -1, 0, 4, -2, -9])).toBe(0);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(2035);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(2 * random.int(1, 5), -20, 20);
			expect(minimumDifference(nums)).toBe(byBruteForce(nums));
		}
	});
});

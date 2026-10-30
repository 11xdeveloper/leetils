import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumAbsoluteDifferenceBetweenElementsWithConstraint as minAbsoluteDifference } from ".";

/** Checks every far-enough pair. */
const byBruteForce = (nums: number[], x: number): number => {
	let best = Number.POSITIVE_INFINITY;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + x; j < nums.length; j++)
			best = Math.min(best, Math.abs((nums[i] ?? 0) - (nums[j] ?? 0)));
	return best;
};

describe("2817. Minimum Absolute Difference Between Elements With Constraint", () => {
	it("solves the examples from the problem statement", () => {
		expect(minAbsoluteDifference([4, 3, 2, 4], 2)).toBe(0);
		expect(minAbsoluteDifference([5, 3, 2, 10, 15], 1)).toBe(1);
		expect(minAbsoluteDifference([1, 2, 3, 4], 3)).toBe(3);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(2817);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(2, 12), 1, 40);
			const x = random.int(0, nums.length - 1);
			expect(minAbsoluteDifference(nums, x)).toBe(byBruteForce(nums, x));
		}
	});
});

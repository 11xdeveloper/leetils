import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSubarrayLengthWithDistinctSumAtLeastK as minLength } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = -1;
	for (let i = 0; i < nums.length; i++)
		for (let j = i; j < nums.length; j++) {
			const sum = [...new Set(nums.slice(i, j + 1))].reduce((a, b) => a + b, 0);
			if (sum >= k && (best < 0 || j - i + 1 < best)) best = j - i + 1;
		}
	return best;
};

describe("3795. Minimum Subarray Length With Distinct Sum At Least K", () => {
	it("solves the examples from the problem statement", () => {
		expect(minLength([2, 2, 3, 1], 4)).toBe(2);
		expect(minLength([3, 2, 3, 4], 5)).toBe(2);
		expect(minLength([5, 5, 4], 5)).toBe(1);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3795);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 5);
			const k = random.int(1, 15);
			expect(minLength(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});

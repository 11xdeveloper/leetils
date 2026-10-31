import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumFrequencyAfterSubarrayOperation as maxFrequency } from ".";

/** Tries every subarray and shift. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = nums.filter((v) => v === k).length;
	for (let i = 0; i < nums.length; i++)
		for (let j = i; j < nums.length; j++)
			for (let x = -10; x <= 10; x++)
				best = Math.max(
					best,
					nums.filter((v, t) => (t >= i && t <= j ? v + x : v) === k).length,
				);
	return best;
};

describe("3434. Maximum Frequency After Subarray Operation", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxFrequency([1, 2, 3, 4, 5, 6], 1)).toBe(2);
		expect(maxFrequency([10, 2, 3, 4, 5, 5, 4, 3, 2, 2], 10)).toBe(4);
	});

	it("matches trying every subarray on random arrays", () => {
		const random = createRandom(3434);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 8), 1, 5);
			const k = random.int(1, 5);
			expect(maxFrequency(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});

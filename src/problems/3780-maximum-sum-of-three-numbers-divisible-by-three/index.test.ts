import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSumOfThreeNumbersDivisibleByThree as maximumSum } from ".";

/** Tries every triple. */
const byBruteForce = (nums: number[]): number => {
	let best = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j < nums.length; j++)
			for (let k = j + 1; k < nums.length; k++) {
				const sum = (nums[i] ?? 0) + (nums[j] ?? 0) + (nums[k] ?? 0);
				if (sum % 3 === 0) best = Math.max(best, sum);
			}
	return best;
};

describe("3780. Maximum Sum of Three Numbers Divisible by Three", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumSum([4, 2, 3, 1])).toBe(9);
		expect(maximumSum([2, 1, 5])).toBe(0);
	});

	it("matches trying every triple on random arrays", () => {
		const random = createRandom(3780);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(3, 10), 1, 30);
			expect(maximumSum(nums)).toBe(byBruteForce(nums));
		}
	});
});

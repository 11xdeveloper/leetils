import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumScoreFromPerformingMultiplicationOperations as maximumScore } from ".";

/** Tries both ends at every step. */
const byBruteForce = (nums: number[], multipliers: number[]): number => {
	const play = (left: number, right: number, i: number): number => {
		if (i === multipliers.length) return 0;
		const m = multipliers[i] ?? 0;
		return Math.max(
			m * (nums[left] ?? 0) + play(left + 1, right, i + 1),
			m * (nums[right] ?? 0) + play(left, right - 1, i + 1),
		);
	};
	return play(0, nums.length - 1, 0);
};

describe("1770. Maximum Score from Performing Multiplication Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumScore([1, 2, 3], [3, 2, 1])).toBe(14);
		expect(maximumScore([-5, -3, -3, -2, 7, 1], [-10, -5, 3, 4, 6])).toBe(102);
	});

	it("matches trying both ends on random inputs", () => {
		const random = createRandom(1770);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), -10, 10);
			const multipliers = random.array(
				random.int(1, Math.min(nums.length, 8)),
				-10,
				10,
			);
			expect(maximumScore(nums, multipliers)).toBe(
				byBruteForce(nums, multipliers),
			);
		}
	});
});

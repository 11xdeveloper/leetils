import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { combinationSumIV } from ".";

/** Counts every sequence by trying each value next. */
const byRecursion = (nums: number[], remaining: number): number =>
	remaining === 0
		? 1
		: nums.reduce(
				(ways, num) =>
					ways + (num <= remaining ? byRecursion(nums, remaining - num) : 0),
				0,
			);

describe("377. Combination Sum IV", () => {
	it("solves the examples from the problem statement", () => {
		expect(combinationSumIV([1, 2, 3], 4)).toBe(7);
		expect(combinationSumIV([9], 3)).toBe(0);
	});

	it("matches counting every sequence on random inputs", () => {
		const random = createRandom(377);
		for (let run = 0; run < 300; run++) {
			const nums = [...new Set(random.array(random.int(1, 4), 1, 6))];
			const target = random.int(1, 15);
			expect(combinationSumIV(nums, target)).toBe(byRecursion(nums, target));
		}
	});
});

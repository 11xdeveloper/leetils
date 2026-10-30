import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { jumpGameVIII as minCost } from ".";

/** Checks the jump rules for every pair of indices. */
const byBruteForce = (nums: number[], costs: number[]): number => {
	const best = nums.map(() => Infinity);
	best[0] = 0;
	for (let i = 0; i < nums.length; i++) {
		const from = nums[i] ?? 0;
		for (let j = i + 1; j < nums.length; j++) {
			const between = nums.slice(i + 1, j);
			const to = nums[j] ?? 0;
			const allowed =
				(from <= to && between.every((v) => v < from)) ||
				(from > to && between.every((v) => v >= from));
			if (allowed)
				best[j] = Math.min(
					best[j] ?? Infinity,
					(best[i] ?? 0) + (costs[j] ?? 0),
				);
		}
	}
	return best.at(-1) ?? 0;
};

describe("2297. Jump Game VIII", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCost([3, 2, 4, 4, 1], [3, 7, 6, 4, 2])).toBe(8);
		expect(minCost([0, 1, 2], [1, 1, 1])).toBe(2);
	});

	it("matches checking every jump on random inputs", () => {
		const random = createRandom(2297);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 10);
			const nums = random.array(n, 0, 5);
			const costs = random.array(n, 0, 9);
			expect(minCost(nums, costs)).toBe(byBruteForce(nums, costs));
		}
	});
});

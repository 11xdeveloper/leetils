import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { markElementsOnArrayByPerformingQueries as unmarkedSumArray } from ".";

/** Re-sorts the unmarked elements for every query. */
const byBruteForce = (nums: number[], queries: number[][]): number[] => {
	const marked = nums.map(() => false);
	return queries.map(([index = 0, k = 0]) => {
		marked[index] = true;
		const free = nums
			.map((_, i) => i)
			.filter((i) => !marked[i])
			.sort((a, b) => (nums[a] ?? 0) - (nums[b] ?? 0) || a - b);
		for (const i of free.slice(0, k)) marked[i] = true;
		return nums.reduce((sum, v, i) => (marked[i] ? sum : sum + v), 0);
	});
};

describe("3080. Mark Elements on Array by Performing Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			unmarkedSumArray(
				[1, 2, 2, 1, 2, 3, 1],
				[
					[1, 2],
					[3, 3],
					[4, 2],
				],
			),
		).toEqual([8, 3, 0]);
		expect(unmarkedSumArray([1, 4, 2, 3], [[0, 1]])).toEqual([7]);
	});

	it("matches re-sorting on random inputs", () => {
		const random = createRandom(3080);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 8), 1, 5);
			const queries = Array.from({ length: random.int(1, 5) }, () => [
				random.int(0, nums.length - 1),
				random.int(0, 3),
			]);
			expect(unmarkedSumArray(nums, queries)).toEqual(
				byBruteForce(nums, queries),
			);
		}
	});
});

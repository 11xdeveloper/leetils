import { describe, expect, it } from "bun:test";
import { minimumCostToBuyApplesII as minCost } from ".";

describe("3928. Minimum Cost to Buy Apples II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCost(2, [8, 3], [[0, 1, 1, 2]])).toEqual([6, 3]);
		expect(
			minCost(
				3,
				[9, 4, 6],
				[
					[0, 1, 1, 3],
					[1, 2, 4, 2],
				],
			),
		).toEqual([8, 4, 6]);
		expect(
			minCost(
				3,
				[10, 11, 1],
				[
					[0, 2, 1, 3],
					[1, 2, 3, 4],
					[0, 1, 5, 2],
				],
			),
		).toEqual([5, 11, 1]);
	});
});

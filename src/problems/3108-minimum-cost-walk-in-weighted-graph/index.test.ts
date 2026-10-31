import { describe, expect, it } from "bun:test";
import { minimumCostWalkInWeightedGraph as minimumCost } from ".";

describe("3108. Minimum Cost Walk in Weighted Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumCost(
				5,
				[
					[0, 1, 7],
					[1, 3, 7],
					[1, 2, 1],
				],
				[
					[0, 3],
					[3, 4],
				],
			),
		).toEqual([1, -1]);
		expect(
			minimumCost(
				3,
				[
					[0, 2, 7],
					[0, 1, 15],
					[1, 2, 6],
					[1, 2, 1],
				],
				[[1, 2]],
			),
		).toEqual([0]);
	});
});

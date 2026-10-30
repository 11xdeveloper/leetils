import { describe, expect, it } from "bun:test";
import { minimumCostToBuyApples as minCost } from ".";

describe("2473. Minimum Cost to Buy Apples", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minCost(
				4,
				[
					[1, 2, 4],
					[2, 3, 2],
					[2, 4, 5],
					[3, 4, 1],
					[1, 3, 4],
				],
				[56, 42, 102, 301],
				2,
			),
		).toEqual([54, 42, 48, 51]);
		expect(
			minCost(
				3,
				[
					[1, 2, 5],
					[2, 3, 1],
					[3, 1, 2],
				],
				[2, 3, 1],
				3,
			),
		).toEqual([2, 3, 1]);
	});
});

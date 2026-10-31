import { describe, expect, it } from "bun:test";
import { maximumProfitFromValidTopologicalOrderInDag as maxProfit } from ".";

describe("3530. Maximum Profit from Valid Topological Order in DAG", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxProfit(2, [[0, 1]], [2, 3])).toBe(8);
		expect(
			maxProfit(
				3,
				[
					[0, 1],
					[0, 2],
				],
				[1, 6, 3],
			),
		).toBe(25);
	});

	it("puts big scores last without edges", () => {
		expect(maxProfit(3, [], [3, 1, 2])).toBe(1 + 4 + 9);
	});
});

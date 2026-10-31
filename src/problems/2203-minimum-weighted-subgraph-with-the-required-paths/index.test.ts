import { describe, expect, it } from "bun:test";
import { minimumWeightedSubgraphWithTheRequiredPaths as minimumWeight } from ".";

describe("2203. Minimum Weighted Subgraph With the Required Paths", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumWeight(
				6,
				[
					[0, 2, 2],
					[0, 5, 6],
					[1, 0, 3],
					[1, 4, 5],
					[2, 1, 1],
					[2, 3, 3],
					[2, 3, 4],
					[3, 4, 2],
					[4, 5, 1],
				],
				0,
				1,
				5,
			),
		).toBe(9);
		expect(
			minimumWeight(
				3,
				[
					[0, 1, 1],
					[2, 1, 1],
				],
				0,
				1,
				2,
			),
		).toBe(-1);
	});
});

import { describe, expect, it } from "bun:test";
import { minimumWeightedSubgraphWithTheRequiredPathsII as minimumWeight } from ".";

describe("3553. Minimum Weighted Subgraph With the Required Paths II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumWeight(
				[
					[0, 1, 2],
					[1, 2, 3],
					[1, 3, 5],
					[1, 4, 4],
					[2, 5, 6],
				],
				[
					[2, 3, 4],
					[0, 2, 5],
				],
			),
		).toEqual([12, 11]);
		expect(
			minimumWeight(
				[
					[1, 0, 8],
					[0, 2, 7],
				],
				[[0, 1, 2]],
			),
		).toEqual([15]);
	});
});

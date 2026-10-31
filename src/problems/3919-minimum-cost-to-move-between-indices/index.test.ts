import { describe, expect, it } from "bun:test";
import { minimumCostToMoveBetweenIndices as minCost } from ".";

describe("3919. Minimum Cost to Move Between Indices", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minCost(
				[-5, -2, 3],
				[
					[0, 2],
					[2, 0],
					[1, 2],
				],
			),
		).toEqual([6, 2, 5]);
		expect(
			minCost(
				[0, 2, 3, 9],
				[
					[3, 0],
					[1, 2],
					[2, 0],
				],
			),
		).toEqual([4, 1, 3]);
	});
});

import { describe, expect, it } from "bun:test";
import { minimumPathCostInAGrid as minPathCost } from ".";

describe("2304. Minimum Path Cost in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minPathCost(
				[
					[5, 3],
					[4, 0],
					[2, 1],
				],
				[
					[9, 8],
					[1, 5],
					[10, 12],
					[18, 6],
					[2, 4],
					[14, 3],
				],
			),
		).toBe(17);
		expect(
			minPathCost(
				[
					[5, 1, 2],
					[4, 0, 3],
				],
				[
					[12, 10, 15],
					[20, 23, 8],
					[21, 7, 1],
					[8, 1, 13],
					[9, 10, 25],
					[5, 3, 2],
				],
			),
		).toBe(6);
	});
});

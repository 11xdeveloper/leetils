import { describe, expect, it } from "bun:test";
import { maximumCostOfTripWithKHighways as maximumCost } from ".";

describe("2247. Maximum Cost of Trip With K Highways", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumCost(
				5,
				[
					[0, 1, 4],
					[2, 1, 3],
					[1, 4, 11],
					[3, 2, 3],
					[3, 4, 2],
				],
				3,
			),
		).toBe(17);
		expect(
			maximumCost(
				4,
				[
					[0, 1, 3],
					[2, 3, 2],
				],
				2,
			),
		).toBe(-1);
	});

	it("crosses a single highway", () => {
		expect(maximumCost(2, [[0, 1, 7]], 1)).toBe(7);
		expect(maximumCost(2, [[0, 1, 7]], 2)).toBe(-1);
	});
});

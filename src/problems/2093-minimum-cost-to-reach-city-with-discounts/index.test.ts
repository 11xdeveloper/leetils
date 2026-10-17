import { describe, expect, it } from "bun:test";
import { minimumCostToReachCityWithDiscounts as minimumCost } from ".";

describe("2093. Minimum Cost to Reach City With Discounts", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumCost(
				5,
				[
					[0, 1, 4],
					[2, 1, 3],
					[1, 4, 11],
					[3, 2, 3],
					[3, 4, 2],
				],
				1,
			),
		).toBe(9);
		expect(
			minimumCost(
				4,
				[
					[1, 3, 17],
					[1, 2, 7],
					[3, 2, 5],
					[0, 1, 6],
					[3, 0, 20],
				],
				20,
			),
		).toBe(8);
		expect(
			minimumCost(
				4,
				[
					[0, 1, 3],
					[2, 3, 2],
				],
				0,
			),
		).toBe(-1);
	});

	it("saves discounts for the costly highways", () => {
		// 0-1-2 costs 10 + 10 = 20, or 5 + 10 with one discount; 0-2 costs 40 or 20.
		expect(
			minimumCost(
				3,
				[
					[0, 1, 10],
					[1, 2, 10],
					[0, 2, 40],
				],
				1,
			),
		).toBe(15);
	});
});

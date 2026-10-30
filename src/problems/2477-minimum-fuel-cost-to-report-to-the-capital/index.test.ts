import { describe, expect, it } from "bun:test";
import { minimumFuelCostToReportToTheCapital as minimumFuelCost } from ".";

describe("2477. Minimum Fuel Cost to Report to the Capital", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumFuelCost(
				[
					[0, 1],
					[0, 2],
					[0, 3],
				],
				5,
			),
		).toBe(3);
		expect(
			minimumFuelCost(
				[
					[3, 1],
					[3, 2],
					[1, 0],
					[0, 4],
					[0, 5],
					[4, 6],
				],
				2,
			),
		).toBe(7);
		expect(minimumFuelCost([], 1)).toBe(0);
	});
});

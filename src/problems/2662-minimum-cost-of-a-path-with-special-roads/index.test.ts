import { describe, expect, it } from "bun:test";
import { minimumCostOfAPathWithSpecialRoads as minimumCost } from ".";

describe("2662. Minimum Cost of a Path With Special Roads", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumCost(
				[1, 1],
				[4, 5],
				[
					[1, 2, 3, 3, 2],
					[3, 4, 4, 5, 1],
				],
			),
		).toBe(5);
		expect(
			minimumCost(
				[3, 2],
				[5, 7],
				[
					[3, 2, 3, 4, 4],
					[3, 3, 5, 5, 5],
					[3, 4, 5, 6, 6],
				],
			),
		).toBe(7);
	});

	it("ignores roads that cost more than walking", () => {
		expect(minimumCost([0, 0], [2, 0], [[0, 0, 2, 0, 10]])).toBe(2);
	});
});

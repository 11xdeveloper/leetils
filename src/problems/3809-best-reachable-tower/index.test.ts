import { describe, expect, it } from "bun:test";
import { bestReachableTower as bestTower } from ".";

describe("3809. Best Reachable Tower", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			bestTower(
				[
					[1, 2, 5],
					[2, 1, 7],
					[3, 1, 9],
				],
				[1, 1],
				2,
			),
		).toEqual([3, 1]);
		expect(
			bestTower(
				[
					[1, 3, 4],
					[2, 2, 4],
					[4, 4, 7],
				],
				[0, 0],
				5,
			),
		).toEqual([1, 3]);
		expect(
			bestTower(
				[
					[5, 6, 8],
					[0, 3, 5],
				],
				[1, 2],
				1,
			),
		).toEqual([-1, -1]);
	});
});

import { describe, expect, it } from "bun:test";
import { kThNearestObstacleQueries as resultsArray } from ".";

describe("3275. K-th Nearest Obstacle Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			resultsArray(
				[
					[1, 2],
					[3, 4],
					[2, 3],
					[-3, 0],
				],
				2,
			),
		).toEqual([-1, 7, 5, 3]);
		expect(
			resultsArray(
				[
					[5, 5],
					[4, 4],
					[3, 3],
				],
				1,
			),
		).toEqual([10, 8, 6]);
	});
});

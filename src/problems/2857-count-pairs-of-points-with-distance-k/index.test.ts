import { describe, expect, it } from "bun:test";
import { countPairsOfPointsWithDistanceK as countPairs } from ".";

describe("2857. Count Pairs of Points With Distance k", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countPairs(
				[
					[1, 2],
					[4, 2],
					[1, 3],
					[5, 2],
				],
				5,
			),
		).toBe(2);
		expect(
			countPairs(
				[
					[1, 3],
					[1, 3],
					[1, 3],
					[1, 3],
					[1, 3],
				],
				0,
			),
		).toBe(10);
	});
});

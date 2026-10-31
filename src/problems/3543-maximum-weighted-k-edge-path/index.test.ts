import { describe, expect, it } from "bun:test";
import { maximumWeightedKEdgePath as maxWeight } from ".";

describe("3543. Maximum Weighted K-Edge Path", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxWeight(
				3,
				[
					[0, 1, 1],
					[1, 2, 2],
				],
				2,
				4,
			),
		).toBe(3);
		expect(
			maxWeight(
				3,
				[
					[0, 1, 2],
					[0, 2, 3],
				],
				1,
				3,
			),
		).toBe(2);
		expect(
			maxWeight(
				3,
				[
					[0, 1, 6],
					[1, 2, 8],
				],
				1,
				6,
			),
		).toBe(-1);
	});

	it("allows a path of no edges", () => {
		expect(maxWeight(2, [], 0, 5)).toBe(0);
	});
});

import { describe, expect, it } from "bun:test";
import { minimizeTheMaximumEdgeWeightOfGraph as minMaxWeight } from ".";

describe("3419. Minimize the Maximum Edge Weight of Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minMaxWeight(
				5,
				[
					[1, 0, 1],
					[2, 0, 2],
					[3, 0, 1],
					[4, 3, 1],
					[2, 1, 1],
				],
				2,
			),
		).toBe(1);
		expect(
			minMaxWeight(
				5,
				[
					[0, 1, 1],
					[0, 2, 2],
					[0, 3, 1],
					[4, 3, 1],
					[2, 1, 1],
				],
				1,
			),
		).toBe(-1);
		expect(
			minMaxWeight(
				5,
				[
					[1, 2, 1],
					[1, 3, 3],
					[1, 4, 5],
					[2, 3, 2],
					[3, 4, 2],
					[4, 0, 1],
				],
				1,
			),
		).toBe(2);
	});
});

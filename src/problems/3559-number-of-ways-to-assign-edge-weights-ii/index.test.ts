import { describe, expect, it } from "bun:test";
import { numberOfWaysToAssignEdgeWeightsII as assignEdgeWeights } from ".";

describe("3559. Number of Ways to Assign Edge Weights II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			assignEdgeWeights(
				[[1, 2]],
				[
					[1, 1],
					[1, 2],
				],
			),
		).toEqual([0, 1]);
		expect(
			assignEdgeWeights(
				[
					[1, 2],
					[1, 3],
					[3, 4],
					[3, 5],
				],
				[
					[1, 4],
					[3, 4],
					[2, 5],
				],
			),
		).toEqual([2, 1, 4]);
	});
});

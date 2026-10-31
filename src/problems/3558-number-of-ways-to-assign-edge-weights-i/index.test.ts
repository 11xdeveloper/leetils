import { describe, expect, it } from "bun:test";
import { numberOfWaysToAssignEdgeWeightsI as assignEdgeWeights } from ".";

describe("3558. Number of Ways to Assign Edge Weights I", () => {
	it("solves the examples from the problem statement", () => {
		expect(assignEdgeWeights([[1, 2]])).toBe(1);
		expect(
			assignEdgeWeights([
				[1, 2],
				[1, 3],
				[3, 4],
				[3, 5],
			]),
		).toBe(2);
	});
});

import { describe, expect, it } from "bun:test";
import { minimumCostPathWithAlternatingDirectionsII as minCost } from ".";

describe("3603. Minimum Cost Path with Alternating Directions II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCost(1, 2, [[1, 2]])).toBe(3);
		expect(
			minCost(2, 2, [
				[3, 5],
				[2, 4],
			]),
		).toBe(9);
		expect(
			minCost(2, 3, [
				[6, 1, 4],
				[3, 2, 5],
			]),
		).toBe(16);
	});

	it("costs 1 for a single cell", () => {
		expect(minCost(1, 1, [[7]])).toBe(1);
	});
});

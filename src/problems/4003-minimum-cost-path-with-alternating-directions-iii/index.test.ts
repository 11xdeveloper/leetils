import { describe, expect, it } from "bun:test";
import { minimumCostPathWithAlternatingDirectionsIII as minCost } from ".";

describe("4003. Minimum Cost Path with Alternating Directions III", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minCost(2, 2, [
				[5, 3],
				[1, 4],
			]),
		).toBe(8);
		expect(
			minCost(2, 2, [
				[0, 7],
				[3, 2],
			]),
		).toBe(7);
		expect(
			minCost(2, 3, [
				[8, 0, 9],
				[7, 4, 1],
			]),
		).toBe(12);
	});
});

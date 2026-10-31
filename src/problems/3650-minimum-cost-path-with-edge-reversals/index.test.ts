import { describe, expect, it } from "bun:test";
import { minimumCostPathWithEdgeReversals as minCost } from ".";

describe("3650. Minimum Cost Path with Edge Reversals", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minCost(4, [
				[0, 1, 3],
				[3, 1, 1],
				[2, 3, 4],
				[0, 2, 2],
			]),
		).toBe(5);
		expect(
			minCost(4, [
				[0, 2, 1],
				[2, 1, 1],
				[1, 3, 1],
				[2, 3, 3],
			]),
		).toBe(3);
	});

	it("returns -1 when the end can't be reached", () => {
		expect(minCost(3, [[0, 1, 1]])).toBe(-1);
	});
});

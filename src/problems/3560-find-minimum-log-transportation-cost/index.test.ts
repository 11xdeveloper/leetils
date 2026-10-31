import { describe, expect, it } from "bun:test";
import { findMinimumLogTransportationCost as minCuttingCost } from ".";

describe("3560. Find Minimum Log Transportation Cost", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCuttingCost(6, 5, 5)).toBe(5);
		expect(minCuttingCost(4, 4, 6)).toBe(0);
	});
});

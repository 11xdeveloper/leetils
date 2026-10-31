import { describe, expect, it } from "bun:test";
import { minimumCostToEqualizeArraysUsingSwaps as minCost } from ".";

describe("3868. Minimum Cost to Equalize Arrays Using Swaps", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCost([10, 20], [20, 10])).toBe(0);
		expect(minCost([10, 10], [20, 20])).toBe(1);
		expect(minCost([10, 20], [30, 40])).toBe(-1);
	});
});

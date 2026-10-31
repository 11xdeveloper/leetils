import { describe, expect, it } from "bun:test";
import { minimumCostToMakeArraysIdentical as minCost } from ".";

describe("3424. Minimum Cost to Make Arrays Identical", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCost([-7, 9, 5], [7, -2, -5], 2)).toBe(13);
		expect(minCost([2, 1], [2, 1], 0)).toBe(0);
	});
});

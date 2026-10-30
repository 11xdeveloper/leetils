import { describe, expect, it } from "bun:test";
import { minimumCostToSplitAnArray as minCost } from ".";

describe("2547. Minimum Cost to Split an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCost([1, 2, 1, 2, 1, 3, 3], 2)).toBe(8);
		expect(minCost([1, 2, 1, 2, 1], 2)).toBe(6);
		expect(minCost([1, 2, 1, 2, 1], 5)).toBe(10);
	});
});

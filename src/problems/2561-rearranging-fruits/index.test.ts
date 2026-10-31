import { describe, expect, it } from "bun:test";
import { rearrangingFruits as minCost } from ".";

describe("2561. Rearranging Fruits", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCost([4, 2, 2, 2], [1, 4, 1, 2])).toBe(1);
		expect(minCost([2, 3, 4, 1], [3, 2, 5, 1])).toBe(-1);
	});

	it("swaps through the cheapest fruit when that's cheaper", () => {
		expect(minCost([1, 100, 100], [1, 200, 200])).toBe(2);
	});
});

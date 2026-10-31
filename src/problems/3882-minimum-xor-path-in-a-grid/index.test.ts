import { describe, expect, it } from "bun:test";
import { minimumXorPathInAGrid as minCost } from ".";

describe("3882. Minimum XOR Path in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minCost([
				[1, 2],
				[3, 4],
			]),
		).toBe(6);
		expect(
			minCost([
				[6, 7],
				[5, 8],
			]),
		).toBe(9);
		expect(minCost([[2, 7, 5]])).toBe(0);
	});
});

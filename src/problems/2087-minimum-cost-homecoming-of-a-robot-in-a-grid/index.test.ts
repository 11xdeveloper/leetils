import { describe, expect, it } from "bun:test";
import { minimumCostHomecomingOfARobotInAGrid as minCost } from ".";

describe("2087. Minimum Cost Homecoming of a Robot in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCost([1, 0], [2, 3], [5, 4, 3], [8, 2, 6, 7])).toBe(18);
		expect(minCost([0, 0], [0, 0], [5], [26])).toBe(0);
	});

	it("moves up and left too", () => {
		expect(minCost([2, 3], [0, 0], [1, 2, 4], [1, 10, 100, 1000])).toBe(114);
	});
});

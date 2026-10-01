import { describe, expect, it } from "bun:test";
import { closestDessertCost as closestCost } from ".";

describe("1774. Closest Dessert Cost", () => {
	it("solves the examples from the problem statement", () => {
		expect(closestCost([1, 7], [3, 4], 10)).toBe(10);
		expect(closestCost([2, 3], [4, 5, 100], 18)).toBe(17);
		expect(closestCost([3, 10], [2, 5], 9)).toBe(8);
		expect(closestCost([10], [1], 1)).toBe(10);
	});
});

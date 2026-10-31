import { describe, expect, it } from "bun:test";
import { bestTimeToBuyAndSellStockUsingStrategy as maxProfit } from ".";

describe("3652. Best Time to Buy and Sell Stock using Strategy", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxProfit([4, 2, 8], [-1, 0, 1], 2)).toBe(10);
		expect(maxProfit([5, 4, 3], [1, 1, 0], 2)).toBe(9);
	});
});

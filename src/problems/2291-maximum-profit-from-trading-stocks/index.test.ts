import { describe, expect, it } from "bun:test";
import { maximumProfitFromTradingStocks as maximumProfit } from ".";

describe("2291. Maximum Profit From Trading Stocks", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumProfit([5, 4, 6, 2, 3], [8, 5, 4, 3, 5], 10)).toBe(6);
		expect(maximumProfit([2, 2, 5], [3, 4, 10], 6)).toBe(5);
		expect(maximumProfit([3, 3, 12], [0, 3, 15], 10)).toBe(0);
	});
});

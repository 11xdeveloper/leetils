import { describe, expect, it } from "bun:test";
import { maximumProfitableTripletsWithIncreasingPricesI as maxProfit } from ".";

describe("2907. Maximum Profitable Triplets With Increasing Prices I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxProfit([10, 2, 3, 4], [100, 2, 7, 10])).toBe(19);
		expect(maxProfit([1, 2, 3, 4, 5], [1, 5, 3, 4, 6])).toBe(15);
		expect(maxProfit([4, 3, 2, 1], [33, 20, 19, 87])).toBe(-1);
	});
});

import { describe, expect, it } from "bun:test";
import { minimumCostOfBuyingCandiesWithDiscount as minimumCost } from ".";

describe("2144. Minimum Cost of Buying Candies With Discount", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumCost([1, 2, 3])).toBe(5);
		expect(minimumCost([6, 5, 7, 9, 2, 2])).toBe(23);
		expect(minimumCost([5, 5])).toBe(10);
	});
});

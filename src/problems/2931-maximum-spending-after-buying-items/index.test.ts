import { describe, expect, it } from "bun:test";
import { maximumSpendingAfterBuyingItems as maxSpending } from ".";

describe("2931. Maximum Spending After Buying Items", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxSpending([
				[8, 5, 2],
				[6, 4, 1],
				[9, 7, 3],
			]),
		).toBe(285);
		expect(
			maxSpending([
				[10, 8, 6, 4, 2],
				[9, 7, 5, 3, 2],
			]),
		).toBe(386);
	});
});

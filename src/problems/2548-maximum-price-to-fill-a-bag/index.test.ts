import { describe, expect, it } from "bun:test";
import { maximumPriceToFillABag as maxPrice } from ".";

describe("2548. Maximum Price to Fill a Bag", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxPrice(
				[
					[50, 1],
					[10, 8],
				],
				5,
			),
		).toBeCloseTo(55, 5);
		expect(maxPrice([[100, 30]], 50)).toBe(-1);
	});
});

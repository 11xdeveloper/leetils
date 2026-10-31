import { describe, expect, it } from "bun:test";
import { applyDiscountToPrices as discountPrices } from ".";

describe("2288. Apply Discount to Prices", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			discountPrices("there are $1 $2 and 5$ candies in the shop", 50),
		).toBe("there are $0.50 $1.00 and 5$ candies in the shop");
		expect(discountPrices("1 2 $3 4 $5 $6 7 8$ $9 $10$", 100)).toBe(
			"1 2 $0.00 4 $0.00 $0.00 7 8$ $0.00 $10$",
		);
	});

	it("keeps large prices exact", () => {
		expect(discountPrices("$9999999999 $", 1)).toBe("$9899999999.01 $");
	});
});

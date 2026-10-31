import { describe, expect, it } from "bun:test";
import { couponCodeValidator as validateCoupons } from ".";

describe("3606. Coupon Code Validator", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			validateCoupons(
				["SAVE20", "", "PHARMA5", "SAVE@20"],
				["restaurant", "grocery", "pharmacy", "restaurant"],
				[true, true, true, true],
			),
		).toEqual(["PHARMA5", "SAVE20"]);
		expect(
			validateCoupons(
				["GROCERY15", "ELECTRONICS_50", "DISCOUNT10"],
				["grocery", "electronics", "invalid"],
				[false, true, true],
			),
		).toEqual(["ELECTRONICS_50"]);
	});

	it("sorts codes within a business line by character code", () => {
		expect(
			validateCoupons(
				["b", "B", "a_1"],
				["grocery", "grocery", "grocery"],
				[true, true, true],
			),
		).toEqual(["B", "a_1", "b"]);
	});
});

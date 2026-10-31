import { describe, expect, it } from "bun:test";
import { minimumTotalPriceAfterApplyingDiscounts as minPrice } from ".";

describe("4014. Minimum Total Price After Applying Discounts", () => {
	it("solves the examples from the problem statement", () => {
		expect(minPrice([10, 30, 21], [50, 60])).toBeCloseTo(32.5);
		expect(minPrice([100, 70], [10, 40, 50])).toBeCloseTo(92);
		expect(minPrice([7, 3, 9], [100, 100])).toBeCloseTo(3);
	});
});

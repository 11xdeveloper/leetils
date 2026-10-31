import { describe, expect, it } from "bun:test";
import { calculateAmountPaidInTaxes as calculateTax } from ".";

describe("2303. Calculate Amount Paid in Taxes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			calculateTax(
				[
					[3, 50],
					[7, 10],
					[12, 25],
				],
				10,
			),
		).toBeCloseTo(2.65, 5);
		expect(
			calculateTax(
				[
					[1, 0],
					[4, 25],
					[5, 50],
				],
				2,
			),
		).toBeCloseTo(0.25, 5);
		expect(calculateTax([[2, 50]], 0)).toBe(0);
	});
});

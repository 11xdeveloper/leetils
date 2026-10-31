import { describe, expect, it } from "bun:test";
import { maximizeAmountAfterTwoDaysOfConversions as maxAmount } from ".";

describe("3387. Maximize Amount After Two Days of Conversions", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxAmount(
				"EUR",
				[
					["EUR", "USD"],
					["USD", "JPY"],
				],
				[2.0, 3.0],
				[
					["JPY", "USD"],
					["USD", "CHF"],
					["CHF", "EUR"],
				],
				[4.0, 5.0, 6.0],
			),
		).toBeCloseTo(720, 5);
		expect(
			maxAmount("NGN", [["NGN", "EUR"]], [9.0], [["NGN", "EUR"]], [6.0]),
		).toBeCloseTo(1.5, 5);
		expect(
			maxAmount("USD", [["USD", "EUR"]], [1.0], [["EUR", "JPY"]], [10.0]),
		).toBeCloseTo(1, 5);
	});
});

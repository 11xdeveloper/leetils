import { describe, expect, it } from "bun:test";
import { sumOfIntegersWithMaximumDigitRange as maxDigitRange } from ".";

describe("3982. Sum of Integers with Maximum Digit Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDigitRange([5724, 111, 350])).toBe(6074);
		expect(maxDigitRange([90, 900])).toBe(990);
	});
});

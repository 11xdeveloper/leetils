import { describe, expect, it } from "bun:test";
import { concatenateNonZeroDigitsAndMultiplyBySumI as sumAndMultiply } from ".";

describe("3754. Concatenate Non-Zero Digits and Multiply by Sum I", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumAndMultiply(10203004)).toBe(12340);
		expect(sumAndMultiply(1000)).toBe(1);
	});

	it("returns 0 for 0", () => {
		expect(sumAndMultiply(0)).toBe(0);
	});
});

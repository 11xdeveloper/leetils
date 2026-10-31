import { describe, expect, it } from "bun:test";
import { alternatingDigitSum } from ".";

describe("2544. Alternating Digit Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(alternatingDigitSum(521)).toBe(4);
		expect(alternatingDigitSum(111)).toBe(1);
		expect(alternatingDigitSum(886996)).toBe(0);
	});

	it("starts with a plus on the leading digit", () => {
		expect(alternatingDigitSum(10)).toBe(1);
		expect(alternatingDigitSum(7)).toBe(7);
	});
});

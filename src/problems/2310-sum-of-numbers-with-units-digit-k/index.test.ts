import { describe, expect, it } from "bun:test";
import { sumOfNumbersWithUnitsDigitK as minimumNumbers } from ".";

describe("2310. Sum of Numbers With Units Digit K", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumNumbers(58, 9)).toBe(2);
		expect(minimumNumbers(37, 2)).toBe(-1);
		expect(minimumNumbers(0, 7)).toBe(0);
	});

	it("handles k = 0", () => {
		expect(minimumNumbers(20, 0)).toBe(1);
		expect(minimumNumbers(21, 0)).toBe(-1);
	});
});

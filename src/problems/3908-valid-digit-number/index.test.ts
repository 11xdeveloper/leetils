import { describe, expect, it } from "bun:test";
import { validDigitNumber as validDigit } from ".";

describe("3908. Valid Digit Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(validDigit(101, 0)).toBeTrue();
		expect(validDigit(232, 2)).toBeFalse();
		expect(validDigit(5, 1)).toBeFalse();
	});
});

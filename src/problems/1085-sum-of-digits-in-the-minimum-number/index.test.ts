import { describe, expect, it } from "bun:test";
import { sumOfDigitsInTheMinimumNumber as sumOfDigits } from ".";

describe("1085. Sum of Digits in the Minimum Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfDigits([34, 23, 1, 24, 75, 33, 54, 8])).toBe(0);
		expect(sumOfDigits([99, 77, 33, 66, 55])).toBe(1);
	});
});

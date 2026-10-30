import { describe, expect, it } from "bun:test";
import { separateTheDigitsInAnArray as separateDigits } from ".";

describe("2553. Separate the Digits in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(separateDigits([13, 25, 83, 77])).toEqual([1, 3, 2, 5, 8, 3, 7, 7]);
		expect(separateDigits([7, 1, 3, 9])).toEqual([7, 1, 3, 9]);
	});
});

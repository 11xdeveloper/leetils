import { describe, expect, it } from "bun:test";
import { differenceBetweenElementSumAndDigitSumOfAnArray as differenceOfSum } from ".";

describe("2535. Difference Between Element Sum and Digit Sum of an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(differenceOfSum([1, 15, 6, 3])).toBe(9);
		expect(differenceOfSum([1, 2, 3, 4])).toBe(0);
	});
});

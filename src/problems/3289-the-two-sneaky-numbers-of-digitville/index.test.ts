import { describe, expect, it } from "bun:test";
import { theTwoSneakyNumbersOfDigitville as getSneakyNumbers } from ".";

describe("3289. The Two Sneaky Numbers of Digitville", () => {
	it("solves the examples from the problem statement", () => {
		expect(getSneakyNumbers([0, 1, 1, 0]).sort()).toEqual([0, 1]);
		expect(getSneakyNumbers([0, 3, 2, 1, 3, 2]).sort()).toEqual([2, 3]);
		expect(
			getSneakyNumbers([7, 1, 5, 4, 3, 4, 6, 0, 9, 5, 8, 2]).sort(),
		).toEqual([4, 5]);
	});
});

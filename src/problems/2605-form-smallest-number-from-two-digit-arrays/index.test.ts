import { describe, expect, it } from "bun:test";
import { formSmallestNumberFromTwoDigitArrays as minNumber } from ".";

describe("2605. Form Smallest Number From Two Digit Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(minNumber([4, 1, 3], [5, 7])).toBe(15);
		expect(minNumber([3, 5, 2, 6], [3, 1, 7])).toBe(3);
	});
});

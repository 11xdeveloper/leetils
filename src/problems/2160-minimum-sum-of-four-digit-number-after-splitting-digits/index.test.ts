import { describe, expect, it } from "bun:test";
import { minimumSumOfFourDigitNumberAfterSplittingDigits as minimumSum } from ".";

describe("2160. Minimum Sum of Four Digit Number After Splitting Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumSum(2932)).toBe(52);
		expect(minimumSum(4009)).toBe(13);
	});
});

import { describe, expect, it } from "bun:test";
import { maximizeSumOfSquaresOfDigits as maxSumOfSquares } from ".";

describe("3723. Maximize Sum of Squares of Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSumOfSquares(2, 3)).toBe("30");
		expect(maxSumOfSquares(2, 17)).toBe("98");
		expect(maxSumOfSquares(1, 10)).toBe("");
	});

	it("fills every digit with 9 when it must", () => {
		expect(maxSumOfSquares(3, 27)).toBe("999");
	});
});

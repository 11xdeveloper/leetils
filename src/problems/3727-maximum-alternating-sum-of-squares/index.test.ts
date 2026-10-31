import { describe, expect, it } from "bun:test";
import { maximumAlternatingSumOfSquares as maxAlternatingSum } from ".";

describe("3727. Maximum Alternating Sum of Squares", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxAlternatingSum([1, 2, 3])).toBe(12);
		expect(maxAlternatingSum([1, -1, 2, -2, 3, -3])).toBe(16);
	});
});

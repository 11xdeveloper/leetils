import { describe, expect, it } from "bun:test";
import { sumOfSquaresOfSpecialElements as sumOfSquares } from ".";

describe("2778. Sum of Squares of Special Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfSquares([1, 2, 3, 4])).toBe(21);
		expect(sumOfSquares([2, 7, 1, 19, 18, 3])).toBe(63);
	});
});

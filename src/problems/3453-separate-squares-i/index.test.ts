import { describe, expect, it } from "bun:test";
import { separateSquaresI as separateSquares } from ".";

describe("3453. Separate Squares I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			separateSquares([
				[0, 0, 1],
				[2, 2, 1],
			]),
		).toBeCloseTo(1, 5);
		expect(
			separateSquares([
				[0, 0, 2],
				[1, 1, 1],
			]),
		).toBeCloseTo(7 / 6, 5);
	});
});

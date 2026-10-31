import { describe, expect, it } from "bun:test";
import { flipSquareSubmatrixVertically as reverseSubmatrix } from ".";

describe("3643. Flip Square Submatrix Vertically", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			reverseSubmatrix(
				[
					[1, 2, 3, 4],
					[5, 6, 7, 8],
					[9, 10, 11, 12],
					[13, 14, 15, 16],
				],
				1,
				0,
				3,
			),
		).toEqual([
			[1, 2, 3, 4],
			[13, 14, 15, 8],
			[9, 10, 11, 12],
			[5, 6, 7, 16],
		]);
		expect(
			reverseSubmatrix(
				[
					[3, 4, 2, 3],
					[2, 3, 4, 2],
				],
				0,
				2,
				2,
			),
		).toEqual([
			[3, 4, 4, 2],
			[2, 3, 2, 3],
		]);
	});
});

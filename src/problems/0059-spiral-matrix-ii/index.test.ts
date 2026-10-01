import { describe, expect, it } from "bun:test";
import { spiralMatrix } from "../0054-spiral-matrix";
import { spiralMatrixII } from ".";

describe("59. Spiral Matrix II", () => {
	it("solves the examples from the problem statement", () => {
		expect(spiralMatrixII(3)).toEqual([
			[1, 2, 3],
			[8, 9, 4],
			[7, 6, 5],
		]);
		expect(spiralMatrixII(1)).toEqual([[1]]);
	});

	it("fills even-sized matrices", () => {
		expect(spiralMatrixII(2)).toEqual([
			[1, 2],
			[4, 3],
		]);
	});

	it("reads back as 1 to n² in spiral order, up to the constraint of 20", () => {
		for (let n = 1; n <= 20; n++) {
			expect(spiralMatrix(spiralMatrixII(n))).toEqual(
				Array.from({ length: n * n }, (_, i) => i + 1),
			);
		}
	});
});

import { describe, expect, it } from "bun:test";
import { searchA2dMatrix } from ".";

const EXAMPLE = [
	[1, 3, 5, 7],
	[10, 11, 16, 20],
	[23, 30, 34, 60],
];

describe("74. Search a 2D Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(searchA2dMatrix(EXAMPLE, 3)).toBeTrue();
		expect(searchA2dMatrix(EXAMPLE, 13)).toBeFalse();
	});

	it("finds the first and last values, and rejects values beyond them", () => {
		expect(searchA2dMatrix(EXAMPLE, 1)).toBeTrue();
		expect(searchA2dMatrix(EXAMPLE, 60)).toBeTrue();
		expect(searchA2dMatrix(EXAMPLE, 0)).toBeFalse();
		expect(searchA2dMatrix(EXAMPLE, 61)).toBeFalse();
	});

	it("agrees with a linear search for every shape and target", () => {
		for (let rows = 1; rows <= 6; rows++) {
			for (let columns = 1; columns <= 6; columns++) {
				const matrix = Array.from({ length: rows }, (_, r) =>
					Array.from({ length: columns }, (_, c) => 2 * (r * columns + c)),
				);
				for (let target = -1; target <= 2 * rows * columns; target++) {
					expect(searchA2dMatrix(matrix, target)).toBe(
						matrix.flat().includes(target),
					);
				}
			}
		}
	});
});

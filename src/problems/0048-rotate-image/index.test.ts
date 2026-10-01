import { describe, expect, it } from "bun:test";
import { rotateImage } from ".";

const rotate = (matrix: number[][]): number[][] => {
	const copy = matrix.map((row) => [...row]);
	rotateImage(copy);
	return copy;
};

/** Builds the rotated matrix directly: row i is column i read bottom to top. */
const byCopying = (matrix: number[][]): number[][] =>
	matrix.map((_, i) => matrix.map((row) => row[i] ?? 0).toReversed());

describe("48. Rotate Image", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			rotate([
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			]),
		).toEqual([
			[7, 4, 1],
			[8, 5, 2],
			[9, 6, 3],
		]);
		expect(
			rotate([
				[5, 1, 9, 11],
				[2, 4, 8, 10],
				[13, 3, 6, 7],
				[15, 14, 12, 16],
			]),
		).toEqual([
			[15, 13, 2, 5],
			[14, 3, 4, 1],
			[12, 6, 8, 9],
			[16, 7, 10, 11],
		]);
	});

	it("leaves a 1×1 matrix unchanged", () => {
		expect(rotate([[1]])).toEqual([[1]]);
	});

	it("modifies the matrix in place", () => {
		const matrix = [
			[1, 2],
			[3, 4],
		];
		const rows = [...matrix];
		expect(rotateImage(matrix)).toBeUndefined();
		expect(matrix).toEqual([
			[3, 1],
			[4, 2],
		]);
		expect(matrix[0]).toBe(rows[0]);
	});

	it("matches building the rotation directly, and four rotations restore the matrix", () => {
		for (let n = 1; n <= 20; n++) {
			const matrix = Array.from({ length: n }, (_, i) =>
				Array.from({ length: n }, (_, j) => i * n + j),
			);
			expect(rotate(matrix)).toEqual(byCopying(matrix));
			expect(rotate(rotate(rotate(rotate(matrix))))).toEqual(matrix);
		}
	});
});

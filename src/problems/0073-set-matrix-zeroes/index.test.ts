import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { setMatrixZeroes } from ".";

const zeroed = (matrix: number[][]): number[][] => {
	const copy = matrix.map((row) => [...row]);
	setMatrixZeroes(copy);
	return copy;
};

/** Records the zero rows and columns first, then builds a new matrix. */
const byCopying = (matrix: number[][]): number[][] => {
	const rows = new Set<number>();
	const columns = new Set<number>();
	for (const [r, row] of matrix.entries()) {
		for (const [c, value] of row.entries()) {
			if (value === 0) {
				rows.add(r);
				columns.add(c);
			}
		}
	}
	return matrix.map((row, r) =>
		row.map((value, c) => (rows.has(r) || columns.has(c) ? 0 : value)),
	);
};

describe("73. Set Matrix Zeroes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			zeroed([
				[1, 1, 1],
				[1, 0, 1],
				[1, 1, 1],
			]),
		).toEqual([
			[1, 0, 1],
			[0, 0, 0],
			[1, 0, 1],
		]);
		expect(
			zeroed([
				[0, 1, 2, 0],
				[3, 4, 5, 2],
				[1, 3, 1, 5],
			]),
		).toEqual([
			[0, 0, 0, 0],
			[0, 4, 5, 0],
			[0, 3, 1, 0],
		]);
	});

	it("modifies the matrix in place", () => {
		const matrix = [
			[1, 0],
			[1, 1],
		];
		expect(setMatrixZeroes(matrix)).toBeUndefined();
		expect(matrix).toEqual([
			[0, 0],
			[1, 0],
		]);
	});

	it("matches recording zeros first on random matrices", () => {
		const random = createRandom(73);
		for (let run = 0; run < 500; run++) {
			const columns = random.int(1, 6);
			const matrix = Array.from({ length: random.int(1, 6) }, () =>
				random.array(columns, 0, 4),
			);
			expect(zeroed(matrix)).toEqual(byCopying(matrix));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findValidMatrixGivenRowAndColumnSums as restoreMatrix } from ".";

const expectValid = (rowSum: number[], colSum: number[]) => {
	const matrix = restoreMatrix(rowSum, colSum);
	expect(matrix.map((row) => row.reduce((s, x) => s + x, 0))).toEqual(rowSum);
	expect(
		colSum.map((_, c) => matrix.reduce((s, row) => s + (row[c] ?? 0), 0)),
	).toEqual(colSum);
	expect(matrix.flat().every((x) => x >= 0)).toBeTrue();
};

describe("1605. Find Valid Matrix Given Row and Column Sums", () => {
	it("solves the examples from the problem statement", () => {
		expectValid([3, 8], [4, 7]);
		expectValid([5, 7, 10], [8, 6, 8]);
	});

	it("matches the sums of random matrices", () => {
		const random = createRandom(1605);
		for (let run = 0; run < 300; run++) {
			const [m, n] = [random.int(1, 6), random.int(1, 6)];
			const source = Array.from({ length: m }, () => random.array(n, 0, 20));
			expectValid(
				source.map((row) => row.reduce((s, x) => s + x, 0)),
				Array.from({ length: n }, (_, c) =>
					source.reduce((s, row) => s + (row[c] ?? 0), 0),
				),
			);
		}
	});
});

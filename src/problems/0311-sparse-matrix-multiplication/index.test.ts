import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sparseMatrixMultiplication as multiply } from ".";

const byDefinition = (a: number[][], b: number[][]): number[][] =>
	a.map((row) =>
		(b[0] ?? []).map(
			(_, j) =>
				row.reduce((sum, value, p) => sum + value * (b[p]?.[j] ?? 0), 0) || 0,
		),
	);

describe("311. Sparse Matrix Multiplication", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			multiply(
				[
					[1, 0, 0],
					[-1, 0, 3],
				],
				[
					[7, 0, 0],
					[0, 0, 0],
					[0, 0, 1],
				],
			),
		).toEqual([
			[7, 0, 0],
			[-7, 0, 3],
		]);
		expect(multiply([[0]], [[0]])).toEqual([[0]]);
	});

	it("matches the definition of matrix multiplication on random sparse matrices", () => {
		const random = createRandom(311);
		for (let run = 0; run < 300; run++) {
			const [m, k, n] = [random.int(1, 5), random.int(1, 5), random.int(1, 5)];
			const sparse = (rows: number, columns: number) =>
				Array.from({ length: rows }, () =>
					Array.from({ length: columns }, () =>
						random.int(0, 2) === 0 ? random.int(-100, 100) : 0,
					),
				);
			const a = sparse(m, k);
			const b = sparse(k, n);
			expect(multiply(a, b)).toEqual(byDefinition(a, b));
		}
	});
});

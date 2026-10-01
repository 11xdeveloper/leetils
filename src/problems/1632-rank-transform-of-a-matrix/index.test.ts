import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { rankTransformOfAMatrix as matrixRankTransform } from ".";

/** Raises ranks from 1 until every row and column constraint holds. */
const byBruteForce = (matrix: number[][]): number[][] => {
	const [rows, cols] = [matrix.length, matrix[0]?.length ?? 0];
	const rank = Array.from({ length: rows }, () =>
		new Array<number>(cols).fill(1),
	);
	for (let changed = true; changed; ) {
		changed = false;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const value = matrix[r]?.[c] ?? 0;
				let needed = rank[r]?.[c] ?? 1;
				const others = [
					...Array.from({ length: cols }, (_, j) => [r, j] as const),
					...Array.from({ length: rows }, (_, i) => [i, c] as const),
				];
				for (const [i, j] of others) {
					const other = matrix[i]?.[j] ?? 0;
					const otherRank = rank[i]?.[j] ?? 1;
					if (other < value) needed = Math.max(needed, otherRank + 1);
					else if (other === value) needed = Math.max(needed, otherRank);
				}
				const row = rank[r];
				if (row && needed !== row[c]) {
					row[c] = needed;
					changed = true;
				}
			}
		}
	}
	return rank;
};

describe("1632. Rank Transform of a Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			matrixRankTransform([
				[1, 2],
				[3, 4],
			]),
		).toEqual([
			[1, 2],
			[2, 3],
		]);
		expect(
			matrixRankTransform([
				[7, 7],
				[7, 7],
			]),
		).toEqual([
			[1, 1],
			[1, 1],
		]);
		expect(
			matrixRankTransform([
				[20, -21, 14],
				[-19, 4, 19],
				[22, -47, 24],
				[-19, 4, 19],
			]),
		).toEqual([
			[4, 2, 3],
			[1, 3, 4],
			[5, 1, 6],
			[1, 3, 4],
		]);
	});

	it("matches raising ranks to a fixed point on random matrices", () => {
		const random = createRandom(1632);
		for (let run = 0; run < 200; run++) {
			const [rows, cols] = [random.int(1, 5), random.int(1, 5)];
			const matrix = Array.from({ length: rows }, () =>
				random.array(cols, 1, 6),
			);
			expect(matrixRankTransform(matrix)).toEqual(byBruteForce(matrix));
		}
	});
});

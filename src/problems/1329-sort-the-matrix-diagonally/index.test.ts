import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sortTheMatrixDiagonally as diagonalSort } from ".";

/** Walks each diagonal from its start on the top row or left column. */
const byBruteForce = (mat: number[][]): number[][] => {
	const result = mat.map((row) => [...row]);
	const [m, n] = [mat.length, mat[0]?.length ?? 0];
	const starts = [
		...Array.from({ length: m }, (_, r) => [r, 0]),
		...Array.from({ length: n - 1 }, (_, c) => [0, c + 1]),
	];
	for (const [r0 = 0, c0 = 0] of starts) {
		const cells: [number, number][] = [];
		for (let [r, c] = [r0, c0]; r < m && c < n; [r, c] = [r + 1, c + 1])
			cells.push([r, c]);
		const values = cells
			.map(([r, c]) => mat[r]?.[c] ?? 0)
			.sort((a, b) => a - b);
		cells.forEach(([r, c], i) => {
			const row = result[r];
			if (row) row[c] = values[i] ?? 0;
		});
	}
	return result;
};

describe("1329. Sort the Matrix Diagonally", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			diagonalSort([
				[3, 3, 1, 1],
				[2, 2, 1, 2],
				[1, 1, 1, 2],
			]),
		).toEqual([
			[1, 1, 1, 1],
			[1, 2, 2, 2],
			[1, 2, 3, 3],
		]);
		expect(
			diagonalSort([
				[11, 25, 66, 1, 69, 7],
				[23, 55, 17, 45, 15, 52],
				[75, 31, 36, 44, 58, 8],
				[22, 27, 33, 25, 68, 4],
				[84, 28, 14, 11, 5, 50],
			]),
		).toEqual([
			[5, 17, 4, 1, 52, 7],
			[11, 11, 25, 45, 8, 69],
			[14, 23, 25, 44, 58, 15],
			[22, 27, 31, 36, 50, 66],
			[84, 28, 75, 33, 55, 68],
		]);
	});

	it("matches walking each diagonal on random matrices", () => {
		const random = createRandom(1329);
		for (let run = 0; run < 200; run++) {
			const [m, n] = [random.int(1, 6), random.int(1, 6)];
			const mat = Array.from({ length: m }, () => random.array(n, 1, 100));
			expect(diagonalSort(mat)).toEqual(byBruteForce(mat));
		}
	});
});

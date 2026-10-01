import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { cellsWithOddValuesInAMatrix as oddCells } from ".";

/** Applies every increment to a real matrix. */
const byBruteForce = (m: number, n: number, indices: number[][]): number => {
	const matrix = Array.from({ length: m }, () => new Array<number>(n).fill(0));
	for (const [r = 0, c = 0] of indices) {
		for (let j = 0; j < n; j++) {
			const row = matrix[r];
			if (row) row[j] = (row[j] ?? 0) + 1;
		}
		for (const row of matrix) row[c] = (row[c] ?? 0) + 1;
	}
	return matrix.flat().filter((value) => value % 2 === 1).length;
};

describe("1252. Cells with Odd Values in a Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			oddCells(2, 3, [
				[0, 1],
				[1, 1],
			]),
		).toBe(6);
		expect(
			oddCells(2, 2, [
				[1, 1],
				[0, 0],
			]),
		).toBe(0);
	});

	it("matches applying the increments on random inputs", () => {
		const random = createRandom(1252);
		for (let run = 0; run < 300; run++) {
			const [m, n] = [random.int(1, 6), random.int(1, 6)];
			const indices = Array.from({ length: random.int(1, 8) }, () => [
				random.int(0, m - 1),
				random.int(0, n - 1),
			]);
			expect(oddCells(m, n, indices)).toBe(byBruteForce(m, n, indices));
		}
	});
});

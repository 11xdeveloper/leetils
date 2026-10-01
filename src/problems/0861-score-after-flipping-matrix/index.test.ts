import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { scoreAfterFlippingMatrix as matrixScore } from ".";

/** Tries every set of row and column flips. */
const byBruteForce = (grid: number[][]): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	let best = 0;
	for (let rows = 0; rows < 1 << m; rows++) {
		for (let cols = 0; cols < 1 << n; cols++) {
			const score = grid.reduce(
				(total, row, r) =>
					total +
					row.reduce(
						(value, bit, c) =>
							value * 2 + (bit ^ ((rows >> r) & 1) ^ ((cols >> c) & 1)),
						0,
					),
				0,
			);
			best = Math.max(best, score);
		}
	}
	return best;
};

describe("861. Score After Flipping Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			matrixScore([
				[0, 0, 1, 1],
				[1, 0, 1, 0],
				[1, 1, 0, 0],
			]),
		).toBe(39);
		expect(matrixScore([[0]])).toBe(1);
	});

	it("matches trying every set of flips on random grids", () => {
		const random = createRandom(861);
		for (let run = 0; run < 300; run++) {
			const cols = random.int(1, 5);
			const grid = Array.from({ length: random.int(1, 5) }, () =>
				random.array(cols, 0, 1),
			);
			expect(matrixScore(grid)).toBe(byBruteForce(grid));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { zeroOneMatrix as updateMatrix } from ".";

/** Manhattan distance to every 0; with no walls, that's the shortest path. */
const byBruteForce = (mat: number[][]): number[][] =>
	mat.map((row, r) =>
		row.map((_, c) => {
			let best = Number.POSITIVE_INFINITY;
			for (const [r2, other] of mat.entries()) {
				for (const [c2, cell] of other.entries())
					if (cell === 0)
						best = Math.min(best, Math.abs(r - r2) + Math.abs(c - c2));
			}
			return best;
		}),
	);

describe("542. 01 Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			updateMatrix([
				[0, 0, 0],
				[0, 1, 0],
				[0, 0, 0],
			]),
		).toEqual([
			[0, 0, 0],
			[0, 1, 0],
			[0, 0, 0],
		]);
		expect(
			updateMatrix([
				[0, 0, 0],
				[0, 1, 0],
				[1, 1, 1],
			]),
		).toEqual([
			[0, 0, 0],
			[0, 1, 0],
			[1, 2, 1],
		]);
	});

	it("matches measuring to every zero on random matrices", () => {
		const random = createRandom(542);
		for (let run = 0; run < 500; run++) {
			const cols = random.int(1, 7);
			const mat = Array.from({ length: random.int(1, 7) }, () =>
				Array.from({ length: cols }, () => (random.int(0, 3) === 0 ? 0 : 1)),
			);
			const first = mat[0];
			if (first && !mat.flat().includes(0)) first[0] = 0;
			expect(updateMatrix(mat)).toEqual(byBruteForce(mat));
		}
	});
});

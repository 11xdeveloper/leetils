import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findSortedSubmatricesWithMaximumElementAtMostK as countSubmatrices } from ".";

/** Checks every submatrix. */
const byBruteForce = (grid: number[][], k: number): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	let count = 0;
	for (let r1 = 0; r1 < m; r1++)
		for (let r2 = r1; r2 < m; r2++)
			for (let c1 = 0; c1 < n; c1++)
				for (let c2 = c1; c2 < n; c2++) {
					let ok = true;
					for (let r = r1; r <= r2 && ok; r++)
						for (let c = c1; c <= c2; c++) {
							const v = grid[r]?.[c] ?? 0;
							if (v > k || (c > c1 && (grid[r]?.[c - 1] ?? 0) < v)) ok = false;
						}
					if (ok) count++;
				}
	return count;
};

describe("3359. Find Sorted Submatrices With Maximum Element at Most K", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countSubmatrices(
				[
					[4, 3, 2, 1],
					[8, 7, 6, 1],
				],
				3,
			),
		).toBe(8);
		expect(
			countSubmatrices(
				[
					[1, 1, 1],
					[1, 1, 1],
					[1, 1, 1],
				],
				1,
			),
		).toBe(36);
		expect(countSubmatrices([[1], [1], [1]], 1)).toBe(6);
	});

	it("matches checking every submatrix on random grids", () => {
		const random = createRandom(3359);
		for (let run = 0; run < 200; run++) {
			const grid = Array.from({ length: random.int(1, 4) }, () =>
				random.array(4, 1, 4),
			);
			const k = random.int(1, 4);
			expect(countSubmatrices(grid, k)).toBe(byBruteForce(grid, k));
		}
	});
});

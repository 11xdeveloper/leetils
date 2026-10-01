import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumFallingPathSumII as minFallingPathSum } from ".";

/** Tries every choice of columns. */
const byBruteForce = (grid: number[][]): number => {
	const walk = (r: number, previous: number): number => {
		const row = grid[r];
		if (!row) return 0;
		let best = Infinity;
		row.forEach((value, c) => {
			if (c !== previous) best = Math.min(best, value + walk(r + 1, c));
		});
		return best;
	};
	return walk(0, -1);
};

describe("1289. Minimum Falling Path Sum II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minFallingPathSum([
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			]),
		).toBe(13);
		expect(minFallingPathSum([[7]])).toBe(7);
	});

	it("matches trying every path on random grids", () => {
		const random = createRandom(1289);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 5);
			const grid = Array.from({ length: n }, () => random.array(n, -9, 9));
			expect(minFallingPathSum(grid)).toBe(byBruteForce(grid));
		}
	});
});

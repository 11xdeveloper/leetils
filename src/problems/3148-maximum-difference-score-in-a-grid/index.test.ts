import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumDifferenceScoreInAGrid as maxScore } from ".";

/** Checks every pair of cells. */
const byBruteForce = (grid: number[][]): number => {
	let best = Number.NEGATIVE_INFINITY;
	grid.forEach((row, r) => {
		row.forEach((value, c) => {
			for (let i = r; i < grid.length; i++)
				for (let j = c; j < row.length; j++)
					if (i !== r || j !== c)
						best = Math.max(best, (grid[i]?.[j] ?? 0) - value);
		});
	});
	return best;
};

describe("3148. Maximum Difference Score in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxScore([
				[9, 5, 7, 3],
				[8, 9, 6, 1],
				[6, 7, 14, 3],
				[2, 5, 3, 1],
			]),
		).toBe(9);
		expect(
			maxScore([
				[4, 3, 2],
				[3, 2, 1],
			]),
		).toBe(-1);
	});

	it("matches checking every pair on random grids", () => {
		const random = createRandom(3148);
		for (let run = 0; run < 300; run++) {
			const m = random.int(1, 5);
			const n = random.int(m === 1 ? 2 : 1, 5);
			const grid = Array.from({ length: m }, () => random.array(n, 1, 20));
			expect(maxScore(grid)).toBe(byBruteForce(grid));
		}
	});
});

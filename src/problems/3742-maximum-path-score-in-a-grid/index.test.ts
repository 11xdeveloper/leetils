import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumPathScoreInAGrid as maxPathScore } from ".";

/** Walks every path. */
const byBruteForce = (grid: number[][], k: number): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	let best = -1;
	const walk = (i: number, j: number, score: number, cost: number): void => {
		const value = grid[i]?.[j] ?? 0;
		[score, cost] = [score + value, cost + (value > 0 ? 1 : 0)];
		if (cost > k) return;
		if (i === m - 1 && j === n - 1) best = Math.max(best, score);
		if (i + 1 < m) walk(i + 1, j, score, cost);
		if (j + 1 < n) walk(i, j + 1, score, cost);
	};
	walk(0, 0, 0, 0);
	return best;
};

describe("3742. Maximum Path Score in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxPathScore(
				[
					[0, 1],
					[2, 0],
				],
				1,
			),
		).toBe(2);
		expect(
			maxPathScore(
				[
					[0, 1],
					[1, 2],
				],
				1,
			),
		).toBe(-1);
	});

	it("matches walking every path on random grids", () => {
		const random = createRandom(3742);
		for (let run = 0; run < 200; run++) {
			const [m, n] = [random.int(1, 5), random.int(1, 5)];
			const grid = Array.from({ length: m }, () => random.array(n, 0, 2));
			grid[0] = [0, ...(grid[0] ?? []).slice(1)];
			const k = random.int(0, 6);
			expect(maxPathScore(grid, k)).toBe(byBruteForce(grid, k));
		}
	});
});

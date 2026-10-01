import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumPathSum } from ".";

/** Tries every path. */
const byRecursion = (grid: number[][], r = 0, c = 0): number => {
	const rows = grid.length;
	const columns = grid[0]?.length ?? 0;
	const cell = grid[r]?.[c] ?? 0;
	if (r === rows - 1 && c === columns - 1) return cell;
	return (
		cell +
		Math.min(
			r + 1 < rows ? byRecursion(grid, r + 1, c) : Number.POSITIVE_INFINITY,
			c + 1 < columns ? byRecursion(grid, r, c + 1) : Number.POSITIVE_INFINITY,
		)
	);
};

describe("64. Minimum Path Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumPathSum([
				[1, 3, 1],
				[1, 5, 1],
				[4, 2, 1],
			]),
		).toBe(7);
		expect(
			minimumPathSum([
				[1, 2, 3],
				[4, 5, 6],
			]),
		).toBe(12);
	});

	it("handles a single cell, row or column", () => {
		expect(minimumPathSum([[5]])).toBe(5);
		expect(minimumPathSum([[1, 2, 3]])).toBe(6);
		expect(minimumPathSum([[1], [2], [3]])).toBe(6);
	});

	it("matches trying every path on random grids", () => {
		const random = createRandom(64);
		for (let run = 0; run < 300; run++) {
			const columns = random.int(1, 6);
			const grid = Array.from({ length: random.int(1, 6) }, () =>
				random.array(columns, 0, 9),
			);
			expect(minimumPathSum(grid)).toBe(byRecursion(grid));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { uniquePaths } from "../0062-unique-paths";
import { uniquePathsII } from ".";

/** Counts paths by trying every move. */
const byRecursion = (grid: number[][], r = 0, c = 0): number => {
	if (r >= grid.length || c >= (grid[0]?.length ?? 0) || grid[r]?.[c] === 1)
		return 0;
	if (r === grid.length - 1 && c === (grid[0]?.length ?? 0) - 1) return 1;
	return byRecursion(grid, r + 1, c) + byRecursion(grid, r, c + 1);
};

describe("63. Unique Paths II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			uniquePathsII([
				[0, 0, 0],
				[0, 1, 0],
				[0, 0, 0],
			]),
		).toBe(2);
		expect(
			uniquePathsII([
				[0, 1],
				[0, 0],
			]),
		).toBe(1);
	});

	it("returns 0 when the start or end is blocked", () => {
		expect(uniquePathsII([[1]])).toBe(0);
		expect(
			uniquePathsII([
				[0, 0],
				[0, 1],
			]),
		).toBe(0);
		expect(
			uniquePathsII([
				[1, 0],
				[0, 0],
			]),
		).toBe(0);
	});

	it("matches Unique Paths without obstacles", () => {
		expect(
			uniquePathsII(Array.from({ length: 5 }, () => new Array(6).fill(0))),
		).toBe(uniquePaths(5, 6));
	});

	it("matches trying every move on random grids", () => {
		const random = createRandom(63);
		for (let run = 0; run < 300; run++) {
			const rows = random.int(1, 6);
			const columns = random.int(1, 6);
			const grid = Array.from({ length: rows }, () =>
				Array.from({ length: columns }, () => (random.int(0, 4) === 0 ? 1 : 0)),
			);
			expect(uniquePathsII(grid)).toBe(byRecursion(grid));
		}
	});
});

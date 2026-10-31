import { describe, expect, it } from "bun:test";
import { sequentialGridPathCover as findPath } from ".";

/** Checks that a path covers the grid, meeting the numbers in order. */
const valid = (grid: number[][], k: number, path: number[][]): boolean => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	if (
		path.length !== m * n ||
		new Set(path.map((p) => p.join())).size !== m * n
	)
		return false;
	let next = 1;
	for (let i = 0; i < path.length; i++) {
		const [r = 0, c = 0] = path[i] ?? [];
		if (i > 0) {
			const [pr = 0, pc = 0] = path[i - 1] ?? [];
			if (Math.abs(r - pr) + Math.abs(c - pc) !== 1) return false;
		}
		const value = grid[r]?.[c] ?? 0;
		if (value !== 0) {
			if (value !== next) return false;
			next++;
		}
	}
	return next === k + 1;
};

describe("3565. Sequential Grid Path Cover", () => {
	it("solves the examples from the problem statement", () => {
		const grid = [
			[0, 0, 0],
			[0, 1, 2],
		];
		expect(valid(grid, 2, findPath(grid, 2))).toBeTrue();
		expect(
			findPath(
				[
					[1, 0, 4],
					[3, 0, 2],
				],
				4,
			),
		).toEqual([]);
	});

	it("finds a path starting at the 1 when it must", () => {
		const grid = [
			[2, 1],
			[0, 0],
		];
		expect(valid(grid, 2, findPath(grid, 2))).toBeTrue();
	});
});

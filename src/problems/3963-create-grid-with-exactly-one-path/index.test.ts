import { describe, expect, it } from "bun:test";
import { createGridWithExactlyOnePath as createGrid } from ".";

/** Counts the right/down paths through free cells. */
const paths = (grid: string[]): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const ways = Array.from({ length: m }, () => new Array<number>(n).fill(0));
	for (let r = 0; r < m; r++)
		for (let c = 0; c < n; c++) {
			if (grid[r]?.[c] !== ".") continue;
			(ways[r] as number[])[c] =
				r === 0 && c === 0
					? 1
					: (ways[r - 1]?.[c] ?? 0) + (ways[r]?.[c - 1] ?? 0);
		}
	return ways[m - 1]?.[n - 1] ?? 0;
};

describe("3963. Create Grid With Exactly One Path", () => {
	it("solves the examples from the problem statement", () => {
		expect(paths(createGrid(2, 3))).toBe(1);
		expect(paths(createGrid(3, 3))).toBe(1);
		expect(createGrid(1, 4)).toEqual(["...."]);
	});

	it("leaves exactly one path for every size", () => {
		for (let m = 1; m <= 6; m++)
			for (let n = 1; n <= 6; n++) {
				const grid = createGrid(m, n);
				expect(grid).toHaveLength(m);
				expect(grid.every((row) => row.length === n)).toBeTrue();
				expect(paths(grid)).toBe(1);
			}
	});
});

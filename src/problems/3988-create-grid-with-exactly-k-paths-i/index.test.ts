import { describe, expect, it } from "bun:test";
import { createGridWithExactlyKPathsI as createGrid } from ".";

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

/** Whether any grid of this size has exactly k paths. */
const possible = (m: number, n: number, k: number): boolean => {
	for (let mask = 0; mask < 1 << (m * n); mask++) {
		const grid = Array.from({ length: m }, (_, r) =>
			Array.from({ length: n }, (_, c) =>
				(mask >> (r * n + c)) & 1 ? "." : "#",
			).join(""),
		);
		if (paths(grid) === k) return true;
	}
	return false;
};

describe("3988. Create Grid With Exactly K Paths I", () => {
	it("solves the examples from the problem statement", () => {
		expect(paths(createGrid(2, 3, 2))).toBe(2);
		expect(paths(createGrid(3, 3, 4))).toBe(4);
		expect(createGrid(1, 4, 2)).toEqual([]);
	});

	it("builds a grid exactly when one exists", () => {
		for (let m = 1; m <= 3; m++)
			for (let n = 1; n <= 4; n++)
				for (let k = 1; k <= 4; k++) {
					const grid = createGrid(m, n, k);
					if (possible(m, n, k)) {
						expect(grid).toHaveLength(m);
						expect(grid.every((row) => row.length === n)).toBeTrue();
						expect(paths(grid)).toBe(k);
					} else expect(grid).toEqual([]);
				}
	});

	it("works for every size up to 10", () => {
		for (let m = 1; m <= 10; m++)
			for (let n = 1; n <= 10; n++)
				for (let k = 1; k <= 4; k++) {
					const grid = createGrid(m, n, k);
					if (grid.length > 0) expect(paths(grid)).toBe(k);
					else
						expect(
							m < 2 ||
								n < 2 ||
								(Math.max(m, n) < k && !(k === 4 && m >= 3 && n >= 3)),
						).toBeTrue();
				}
	});
});

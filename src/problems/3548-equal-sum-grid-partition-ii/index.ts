/**
 * 3548. Equal Sum Grid Partition II
 *
 * Whether one horizontal or vertical cut splits the grid into two non-empty
 * parts with equal sums, possibly after discounting one cell from one part
 * as long as that part stays connected.
 *
 * Sweep each cut, keeping counts of the values on each side. If the sums
 * differ by d, look for a cell worth d on the heavier side that can go: in
 * a part at least 2 × 2 any cell can, while a single row or column can only
 * lose an end. Transposing reuses the sweep for vertical cuts.
 *
 * @see https://leetcode.com/problems/equal-sum-grid-partition-ii/
 * @difficulty Hard
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * equalSumGridPartitionII([[1, 4], [2, 3]]); // true
 */
export const equalSumGridPartitionII = (
	grid: readonly (readonly number[])[],
): boolean => {
	const horizontal = (g: readonly (readonly number[])[]): boolean => {
		const m = g.length;
		const n = g[0]?.length ?? 0;
		const total = g.reduce(
			(sum, row) => sum + row.reduce((a, b) => a + b, 0),
			0,
		);
		const below = new Map<number, number>();
		for (const row of g)
			for (const v of row) below.set(v, (below.get(v) ?? 0) + 1);
		const above = new Map<number, number>();
		let top = 0;
		const removable = (
			counts: Map<number, number>,
			value: number,
			rows: number,
			firstRow: number,
			lastRow: number,
		): boolean => {
			if (rows * n === 1) return false;
			if (rows >= 2 && n >= 2) return (counts.get(value) ?? 0) > 0;
			if (rows === 1)
				return g[firstRow]?.[0] === value || g[firstRow]?.[n - 1] === value;
			return g[firstRow]?.[0] === value || g[lastRow]?.[0] === value;
		};
		for (let cut = 0; cut + 1 < m; cut++) {
			for (const v of g[cut] ?? []) {
				above.set(v, (above.get(v) ?? 0) + 1);
				below.set(v, (below.get(v) ?? 0) - 1);
				top += v;
			}
			const bottom = total - top;
			if (top === bottom) return true;
			if (top > bottom && removable(above, top - bottom, cut + 1, 0, cut))
				return true;
			if (
				bottom > top &&
				removable(below, bottom - top, m - cut - 1, cut + 1, m - 1)
			)
				return true;
		}
		return false;
	};
	const transposed = (grid[0] ?? []).map((_, c) =>
		grid.map((row) => row[c] ?? 0),
	);
	return horizontal(grid) || horizontal(transposed);
};

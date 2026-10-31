/**
 * 2304. Minimum Path Cost in a Grid
 *
 * A path visits one cell per row, top to bottom; its cost is the sum of
 * the cells' values plus `moveCost[value][column]` for each move. Returns
 * the cheapest path's cost.
 *
 * Row-by-row DP over the column of the latest cell.
 *
 * @see https://leetcode.com/problems/minimum-path-cost-in-a-grid/
 * @difficulty Medium
 * @timeComplexity O(m · n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumPathCostInAGrid([[5, 3], [4, 0], [2, 1]], [[9, 8], [1, 5], [10, 12], [18, 6], [2, 4], [14, 3]]); // 17
 */
export const minimumPathCostInAGrid = (
	grid: readonly (readonly number[])[],
	moveCost: readonly (readonly number[])[],
): number => {
	let cost = [...(grid[0] ?? [])];
	for (let r = 1; r < grid.length; r++) {
		const above = grid[r - 1] ?? [];
		cost = (grid[r] ?? []).map((value, c) => {
			let best = Infinity;
			for (const [p, from] of above.entries())
				best = Math.min(best, (cost[p] ?? 0) + (moveCost[from]?.[c] ?? 0));
			return best + value;
		});
	}
	return Math.min(...cost);
};

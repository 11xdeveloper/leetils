/**
 * 807. Max Increase to Keep City Skyline
 *
 * `grid` gives building heights. Returns the most the heights can be raised
 * in total without changing the skyline seen from any side, i.e. each row's
 * and column's maximum.
 *
 * Each building can rise to the smaller of its row's and column's maximum.
 *
 * @see https://leetcode.com/problems/max-increase-to-keep-city-skyline/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * maxIncreaseToKeepCitySkyline([[3, 0, 8, 4], [2, 4, 5, 7], [9, 2, 6, 3], [0, 3, 1, 0]]); // 35
 */
export const maxIncreaseToKeepCitySkyline = (
	grid: readonly (readonly number[])[],
): number => {
	const rowMax = grid.map((row) => Math.max(...row));
	const colMax = (grid[0] ?? []).map((_, c) =>
		Math.max(...grid.map((row) => row[c] ?? 0)),
	);
	let total = 0;
	for (const [r, row] of grid.entries()) {
		for (const [c, height] of row.entries())
			total += Math.min(rowMax[r] ?? 0, colMax[c] ?? 0) - height;
	}
	return total;
};

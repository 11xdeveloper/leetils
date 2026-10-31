/**
 * 3402. Minimum Operations to Make Columns Strictly Increasing
 *
 * The fewest increments of single cells to make every column of the grid
 * strictly increasing from top to bottom.
 *
 * Going down each column, raise each cell to one more than the cell above
 * if it isn't already.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-columns-strictly-increasing/
 * @difficulty Easy
 * @timeComplexity O(m · n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumOperationsToMakeColumnsStrictlyIncreasing([[3, 2], [1, 3], [3, 4], [0, 1]]); // 15
 */
export const minimumOperationsToMakeColumnsStrictlyIncreasing = (
	grid: readonly (readonly number[])[],
): number => {
	const above = [...(grid[0] ?? [])];
	let operations = 0;
	for (const row of grid.slice(1))
		row.forEach((value, c) => {
			const needed = Math.max(value, (above[c] ?? 0) + 1);
			operations += needed - value;
			above[c] = needed;
		});
	return operations;
};

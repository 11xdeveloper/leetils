/**
 * 3989. Maximum Consistent Columns in a Grid
 *
 * Keep some columns of `grid` (at least one, in order) so that every row
 * changes by at most `limit` between kept neighbours. Returns the most
 * columns that can be kept.
 *
 * Longest-chain dynamic programming over columns, checking each pair.
 *
 * @see https://leetcode.com/problems/maximum-consistent-columns-in-a-grid/
 * @difficulty Hard
 * @timeComplexity O(n² · m)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumConsistentColumnsInAGrid([[1, -1, 1], [2, 2, 2]], 1); // 2
 */
export const maximumConsistentColumnsInAGrid = (
	grid: readonly (readonly number[])[],
	limit: number,
): number => {
	const n = grid[0]?.length ?? 0;
	const fits = (a: number, b: number) =>
		grid.every((row) => Math.abs((row[b] ?? 0) - (row[a] ?? 0)) <= limit);
	const longest = new Array<number>(n).fill(1);
	for (let j = 0; j < n; j++)
		for (let i = 0; i < j; i++)
			if ((longest[i] ?? 0) + 1 > (longest[j] ?? 0) && fits(i, j))
				longest[j] = (longest[i] ?? 0) + 1;
	return Math.max(...longest);
};

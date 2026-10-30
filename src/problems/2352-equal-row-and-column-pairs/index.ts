/**
 * 2352. Equal Row and Column Pairs
 *
 * Counts the pairs (row, column) of the square `grid` holding the same
 * sequence of values.
 *
 * Count rows by their contents, then look up each column.
 *
 * @see https://leetcode.com/problems/equal-row-and-column-pairs/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * equalRowAndColumnPairs([[3, 2, 1], [1, 7, 6], [2, 7, 7]]); // 1
 */
export const equalRowAndColumnPairs = (
	grid: readonly (readonly number[])[],
): number => {
	const rows = new Map<string, number>();
	for (const row of grid) {
		const key = row.join(",");
		rows.set(key, (rows.get(key) ?? 0) + 1);
	}
	let pairs = 0;
	for (let c = 0; c < grid.length; c++)
		pairs += rows.get(grid.map((row) => row[c]).join(",")) ?? 0;
	return pairs;
};

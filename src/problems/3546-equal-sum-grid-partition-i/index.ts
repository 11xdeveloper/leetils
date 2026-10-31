/**
 * 3546. Equal Sum Grid Partition I
 *
 * Whether one horizontal or vertical cut splits the grid into two non-empty
 * parts with equal sums.
 *
 * Sweep the row sums and the column sums looking for a prefix that's half
 * the total.
 *
 * @see https://leetcode.com/problems/equal-sum-grid-partition-i/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * equalSumGridPartitionI([[1, 4], [2, 3]]); // true
 */
export const equalSumGridPartitionI = (
	grid: readonly (readonly number[])[],
): boolean => {
	const rows = grid.map((row) => row.reduce((a, b) => a + b, 0));
	const cols = (grid[0] ?? []).map((_, c) =>
		grid.reduce((sum, row) => sum + (row[c] ?? 0), 0),
	);
	const total = rows.reduce((a, b) => a + b, 0);
	const splits = (sums: number[]): boolean => {
		let prefix = 0;
		for (let i = 0; i + 1 < sums.length; i++) {
			prefix += sums[i] ?? 0;
			if (2 * prefix === total) return true;
		}
		return false;
	};
	return splits(rows) || splits(cols);
};

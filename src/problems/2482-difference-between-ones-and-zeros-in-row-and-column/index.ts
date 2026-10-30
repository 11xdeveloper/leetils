/**
 * 2482. Difference Between Ones and Zeros in Row and Column
 *
 * Returns the matrix whose cell `(i, j)` is the ones in row `i` plus the
 * ones in column `j`, minus the zeros in each.
 *
 * With `a` ones in a line of length `L`, ones minus zeros is `2a - L`.
 *
 * @see https://leetcode.com/problems/difference-between-ones-and-zeros-in-row-and-column/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * differenceBetweenOnesAndZerosInRowAndColumn([[0, 1, 1], [1, 0, 1], [0, 0, 1]]); // [[0, 0, 4], [0, 0, 4], [-2, -2, 2]]
 */
export const differenceBetweenOnesAndZerosInRowAndColumn = (
	grid: readonly (readonly number[])[],
): number[][] => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	const rowOnes = grid.map((row) => row.reduce((sum, v) => sum + v, 0));
	const colOnes = (grid[0] ?? []).map((_, c) =>
		grid.reduce((sum, row) => sum + (row[c] ?? 0), 0),
	);
	return grid.map((row, r) =>
		row.map((_, c) => 2 * (rowOnes[r] ?? 0) - n + 2 * (colOnes[c] ?? 0) - m),
	);
};

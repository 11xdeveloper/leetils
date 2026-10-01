/**
 * 1380. Lucky Numbers in a Matrix
 *
 * Returns the values of `matrix` (all distinct) that are the smallest in
 * their row and the largest in their column.
 *
 * Takes each row's minimum and each column's maximum; a value that is both
 * is lucky.
 *
 * @see https://leetcode.com/problems/lucky-numbers-in-a-matrix/
 * @difficulty Easy
 * @timeComplexity O(mn)
 * @spaceComplexity O(m + n)
 *
 * @example
 * luckyNumbersInAMatrix([[3, 7, 8], [9, 11, 13], [15, 16, 17]]); // [15]
 */
export const luckyNumbersInAMatrix = (
	matrix: readonly (readonly number[])[],
): number[] => {
	const rowMins = new Set(matrix.map((row) => Math.min(...row)));
	const columnMaxes = (matrix[0] ?? []).map((_, c) =>
		Math.max(...matrix.map((row) => row[c] ?? 0)),
	);
	return columnMaxes.filter((value) => rowMins.has(value));
};

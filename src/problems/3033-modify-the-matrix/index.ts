/**
 * 3033. Modify the Matrix
 *
 * Replace every -1 in `matrix` with the largest value in its column.
 *
 * Find each column's maximum, then copy the matrix, filling in the -1s.
 *
 * @see https://leetcode.com/problems/modify-the-matrix/
 * @difficulty Easy
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * modifyTheMatrix([[1, 2, -1], [4, -1, 6], [7, 8, 9]]); // [[1, 2, 9], [4, 8, 6], [7, 8, 9]]
 */
export const modifyTheMatrix = (
	matrix: readonly (readonly number[])[],
): number[][] => {
	const max = (matrix[0] ?? []).map((_, c) =>
		Math.max(...matrix.map((row) => row[c] ?? 0)),
	);
	return matrix.map((row) =>
		row.map((value, c) => (value === -1 ? (max[c] ?? 0) : value)),
	);
};

/**
 * 867. Transpose Matrix
 *
 * Returns the transpose of `matrix`: its rows become columns.
 *
 * Element `[r][c]` moves to `[c][r]`.
 *
 * @see https://leetcode.com/problems/transpose-matrix/
 * @difficulty Easy
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n) for the result
 *
 * @example
 * transposeMatrix([[1, 2, 3], [4, 5, 6]]); // [[1, 4], [2, 5], [3, 6]]
 */
export const transposeMatrix = (
	matrix: readonly (readonly number[])[],
): number[][] =>
	(matrix[0] ?? []).map((_, c) => matrix.map((row) => row[c] ?? 0));

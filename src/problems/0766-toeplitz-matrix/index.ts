/**
 * 766. Toeplitz Matrix
 *
 * Returns whether every top-left to bottom-right diagonal of `matrix` holds
 * a single value.
 *
 * That's the same as every element equalling the one diagonally above and
 * to its left.
 *
 * @see https://leetcode.com/problems/toeplitz-matrix/
 * @difficulty Easy
 * @timeComplexity O(m · n)
 * @spaceComplexity O(1)
 *
 * @example
 * toeplitzMatrix([[1, 2, 3, 4], [5, 1, 2, 3], [9, 5, 1, 2]]); // true
 */
export const toeplitzMatrix = (
	matrix: readonly (readonly number[])[],
): boolean =>
	matrix.every(
		(row, r) =>
			r === 0 ||
			row.every((value, c) => c === 0 || value === matrix[r - 1]?.[c - 1]),
	);

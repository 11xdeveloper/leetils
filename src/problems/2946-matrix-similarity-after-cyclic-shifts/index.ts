/**
 * 2946. Matrix Similarity After Cyclic Shifts
 *
 * Even rows shift left and odd rows shift right, `k` times each. Returns
 * whether the matrix ends up unchanged.
 *
 * Either way, a row is unchanged exactly when shifting it by `k` maps it
 * to itself.
 *
 * @see https://leetcode.com/problems/matrix-similarity-after-cyclic-shifts/
 * @difficulty Easy
 * @timeComplexity O(m · n)
 * @spaceComplexity O(1)
 *
 * @example
 * matrixSimilarityAfterCyclicShifts([[1, 2, 1, 2], [5, 5, 5, 5], [6, 3, 6, 3]], 2); // true
 */
export const matrixSimilarityAfterCyclicShifts = (
	mat: readonly (readonly number[])[],
	k: number,
): boolean =>
	mat.every((row) =>
		row.every((value, j) => value === row[(j + k) % row.length]),
	);

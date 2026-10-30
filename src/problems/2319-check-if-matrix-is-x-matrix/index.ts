/**
 * 2319. Check if Matrix Is X-Matrix
 *
 * Returns whether every diagonal element of the square `grid` is non-zero
 * and every other element is zero.
 *
 * @see https://leetcode.com/problems/check-if-matrix-is-x-matrix/
 * @difficulty Easy
 * @timeComplexity O(n^2)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfMatrixIsXMatrix([[2, 0, 0, 1], [0, 3, 1, 0], [0, 5, 2, 0], [4, 0, 0, 2]]); // true
 */
export const checkIfMatrixIsXMatrix = (
	grid: readonly (readonly number[])[],
): boolean =>
	grid.every((row, r) =>
		row.every(
			(value, c) => (r === c || r + c === grid.length - 1) === (value !== 0),
		),
	);

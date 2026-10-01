/**
 * 1572. Matrix Diagonal Sum
 *
 * Returns the sum of both diagonals of the square matrix `mat`, counting
 * the shared centre (for odd sizes) once.
 *
 * Adds the two diagonal entries of each row, then removes the double-counted
 * centre.
 *
 * @see https://leetcode.com/problems/matrix-diagonal-sum/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * matrixDiagonalSum([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); // 25
 */
export const matrixDiagonalSum = (
	mat: readonly (readonly number[])[],
): number => {
	const n = mat.length;
	let total = 0;
	mat.forEach((row, i) => {
		total += (row[i] ?? 0) + (row[n - 1 - i] ?? 0);
	});
	if (n % 2 === 1) total -= mat[(n - 1) / 2]?.[(n - 1) / 2] ?? 0;
	return total;
};

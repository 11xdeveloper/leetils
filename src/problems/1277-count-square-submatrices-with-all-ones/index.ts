/**
 * 1277. Count Square Submatrices with All Ones
 *
 * Returns the number of square submatrices of `matrix` made entirely of 1s.
 *
 * `side[r][c]` is the largest all-ones square with its bottom-right corner
 * at `(r, c)`: one more than the smallest of those above, left and
 * diagonally up-left. That cell is the corner of exactly that many squares.
 *
 * @see https://leetcode.com/problems/count-square-submatrices-with-all-ones/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(n)
 *
 * @example
 * countSquareSubmatricesWithAllOnes([[0, 1, 1, 1], [1, 1, 1, 1], [0, 1, 1, 1]]); // 15
 */
export const countSquareSubmatricesWithAllOnes = (
	matrix: readonly (readonly number[])[],
): number => {
	const n = matrix[0]?.length ?? 0;
	let above = new Array<number>(n).fill(0);
	let total = 0;
	for (const row of matrix) {
		const current = new Array<number>(n).fill(0);
		row.forEach((cell, c) => {
			if (cell !== 1) return;
			current[c] =
				1 + Math.min(above[c] ?? 0, current[c - 1] ?? 0, above[c - 1] ?? 0);
			total += current[c] ?? 0;
		});
		above = current;
	}
	return total;
};

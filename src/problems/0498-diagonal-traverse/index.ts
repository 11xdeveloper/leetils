/**
 * 498. Diagonal Traverse
 *
 * Returns the elements of the `m × n` matrix `mat` in zigzag diagonal
 * order: the first anti-diagonal read upwards, the next downwards, and so
 * on.
 *
 * Anti-diagonal `d` holds the cells with `row + col = d`. Even diagonals
 * are read with the row decreasing and odd ones with it increasing, clamped
 * to the rows the diagonal actually crosses.
 *
 * @see https://leetcode.com/problems/diagonal-traverse/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * diagonalTraverse([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); // [1, 2, 4, 7, 5, 3, 6, 8, 9]
 */
export const diagonalTraverse = (
	mat: readonly (readonly number[])[],
): number[] => {
	const m = mat.length;
	const n = mat[0]?.length ?? 0;
	const order: number[] = [];

	for (let d = 0; d < m + n - 1; d++) {
		const firstRow = Math.max(0, d - n + 1);
		const lastRow = Math.min(m - 1, d);
		if (d % 2 === 0) {
			for (let row = lastRow; row >= firstRow; row--)
				order.push(mat[row]?.[d - row] ?? 0);
		} else {
			for (let row = firstRow; row <= lastRow; row++)
				order.push(mat[row]?.[d - row] ?? 0);
		}
	}

	return order;
};

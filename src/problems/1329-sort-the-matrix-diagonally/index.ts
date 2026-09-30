/**
 * 1329. Sort the Matrix Diagonally
 *
 * Returns `mat` with each top-left to bottom-right diagonal sorted in
 * ascending order.
 *
 * Cells on a diagonal share `r − c`, so group the values by it, sort each
 * group, and write them back in order.
 *
 * @see https://leetcode.com/problems/sort-the-matrix-diagonally/
 * @difficulty Medium
 * @timeComplexity O(mn log(min(m, n)))
 * @spaceComplexity O(mn)
 *
 * @example
 * sortTheMatrixDiagonally([[3, 3, 1, 1], [2, 2, 1, 2], [1, 1, 1, 2]]); // [[1, 1, 1, 1], [1, 2, 2, 2], [1, 2, 3, 3]]
 */
export const sortTheMatrixDiagonally = (
	mat: readonly (readonly number[])[],
): number[][] => {
	const n = mat[0]?.length ?? 0;
	const diagonals = new Map<number, number[]>();
	mat.forEach((row, r) => {
		row.forEach((value, c) => {
			const list = diagonals.get(r - c);
			if (list) list.push(value);
			else diagonals.set(r - c, [value]);
		});
	});
	for (const list of diagonals.values()) list.sort((a, b) => b - a);
	return mat.map((_, r) =>
		Array.from({ length: n }, (_, c) => diagonals.get(r - c)?.pop() ?? 0),
	);
};

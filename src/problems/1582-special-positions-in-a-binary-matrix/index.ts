/**
 * 1582. Special Positions in a Binary Matrix
 *
 * Counts the 1s of `mat` that are the only 1 in their row and column.
 *
 * Counts the 1s in each row and column first.
 *
 * @see https://leetcode.com/problems/special-positions-in-a-binary-matrix/
 * @difficulty Easy
 * @timeComplexity O(mn)
 * @spaceComplexity O(m + n)
 *
 * @example
 * specialPositionsInABinaryMatrix([[1, 0, 0], [0, 0, 1], [1, 0, 0]]); // 1
 */
export const specialPositionsInABinaryMatrix = (
	mat: readonly (readonly number[])[],
): number => {
	const rows = mat.map((row) => row.reduce((sum, cell) => sum + cell, 0));
	const columns = (mat[0] ?? []).map((_, c) =>
		mat.reduce((sum, row) => sum + (row[c] ?? 0), 0),
	);
	let count = 0;
	mat.forEach((row, r) => {
		row.forEach((cell, c) => {
			if (cell === 1 && rows[r] === 1 && columns[c] === 1) count++;
		});
	});
	return count;
};

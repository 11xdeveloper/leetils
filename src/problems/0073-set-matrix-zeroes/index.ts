/**
 * 73. Set Matrix Zeroes
 *
 * Sets the whole row and column of every 0 in an m×n matrix to 0, in place,
 * as the problem requires.
 *
 * Uses the first row and column as markers for which columns and rows to
 * clear, so no extra space is needed. Whether the first row and column
 * themselves need clearing is recorded first, since the markers overwrite
 * them.
 *
 * @see https://leetcode.com/problems/set-matrix-zeroes/
 * @difficulty Medium
 * @timeComplexity O(m * n)
 * @spaceComplexity O(1)
 *
 * @example
 * const matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]];
 * setMatrixZeroes(matrix); // matrix is now [[1, 0, 1], [0, 0, 0], [1, 0, 1]]
 */
export const setMatrixZeroes = (matrix: number[][]): void => {
	const firstRow = matrix[0] ?? [];
	const firstRowHasZero = firstRow.includes(0);
	const firstColumnHasZero = matrix.some((row) => row[0] === 0);

	for (const [r, row] of matrix.entries()) {
		for (const [c, value] of row.entries()) {
			if (value === 0 && r > 0 && c > 0) {
				row[0] = 0;
				firstRow[c] = 0;
			}
		}
	}

	for (const [r, row] of matrix.entries()) {
		if (r === 0) continue;
		for (let c = 1; c < row.length; c++) {
			if (row[0] === 0 || firstRow[c] === 0) row[c] = 0;
		}
	}

	if (firstRowHasZero) firstRow.fill(0);
	if (firstColumnHasZero) for (const row of matrix) row[0] = 0;
};

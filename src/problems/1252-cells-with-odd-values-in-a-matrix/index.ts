/**
 * 1252. Cells with Odd Values in a Matrix
 *
 * Starting from an `m × n` matrix of zeros, each `[r, c]` in `indices` adds
 * one to every cell of row `r` and of column `c`. Returns how many cells end
 * up odd.
 *
 * A cell is odd when exactly one of its row and column was incremented an
 * odd number of times. So count the odd rows and odd columns and combine.
 *
 * @see https://leetcode.com/problems/cells-with-odd-values-in-a-matrix/
 * @difficulty Easy
 * @timeComplexity O(m + n + k) for k indices
 * @spaceComplexity O(m + n)
 *
 * @example
 * cellsWithOddValuesInAMatrix(2, 3, [[0, 1], [1, 1]]); // 6
 */
export const cellsWithOddValuesInAMatrix = (
	m: number,
	n: number,
	indices: readonly (readonly number[])[],
): number => {
	const rows = new Uint8Array(m);
	const columns = new Uint8Array(n);
	for (const [r = 0, c = 0] of indices) {
		rows[r] = (rows[r] ?? 0) ^ 1;
		columns[c] = (columns[c] ?? 0) ^ 1;
	}
	const oddRows = rows.reduce((sum, bit) => sum + bit, 0);
	const oddColumns = columns.reduce((sum, bit) => sum + bit, 0);
	return oddRows * (n - oddColumns) + (m - oddRows) * oddColumns;
};

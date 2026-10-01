/**
 * 1605. Find Valid Matrix Given Row and Column Sums
 *
 * Returns a matrix of non-negative integers with the given row and column
 * sums (which are guaranteed to agree).
 *
 * Greedy: each cell takes as much as both its row and column still need,
 * which uses up one or the other.
 *
 * @see https://leetcode.com/problems/find-valid-matrix-given-row-and-column-sums/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(m + n), excluding the result
 *
 * @example
 * findValidMatrixGivenRowAndColumnSums([3, 8], [4, 7]); // [[3, 0], [1, 7]]
 */
export const findValidMatrixGivenRowAndColumnSums = (
	rowSum: readonly number[],
	colSum: readonly number[],
): number[][] => {
	const [rows, columns] = [[...rowSum], [...colSum]];
	return rows.map((_, r) =>
		columns.map((__, c) => {
			const value = Math.min(rows[r] ?? 0, columns[c] ?? 0);
			rows[r] = (rows[r] ?? 0) - value;
			columns[c] = (columns[c] ?? 0) - value;
			return value;
		}),
	);
};

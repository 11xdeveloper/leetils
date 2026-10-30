/**
 * 2128. Remove All Ones With Row and Column Flips
 *
 * An operation flips every bit in a row or column of `grid`. Returns
 * whether all the 1s can be removed.
 *
 * Flips preserve whether two rows are equal or complementary, and an
 * all-zero grid has only equal rows, so every row must match the first
 * row or its complement (which is also enough).
 *
 * @see https://leetcode.com/problems/remove-all-ones-with-row-and-column-flips/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(1)
 *
 * @example
 * removeAllOnesWithRowAndColumnFlips([[0, 1, 0], [1, 0, 1], [0, 1, 0]]); // true
 */
export const removeAllOnesWithRowAndColumnFlips = (
	grid: readonly (readonly number[])[],
): boolean => {
	const first = grid[0] ?? [];
	return grid.every((row) => {
		const flipped = row[0] !== first[0];
		return row.every((cell, c) => (cell !== first[c]) === flipped);
	});
};

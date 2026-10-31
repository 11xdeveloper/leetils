/**
 * 2639. Find the Width of Columns of a Grid
 *
 * A column's width is the length of its longest number, counting a minus
 * sign. Returns the width of each column.
 *
 * Measure each number's decimal string.
 *
 * @see https://leetcode.com/problems/find-the-width-of-columns-of-a-grid/
 * @difficulty Easy
 * @timeComplexity O(m · n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheWidthOfColumnsOfAGrid([[-15, 1, 3], [15, 7, 12], [5, 6, -2]]); // [3, 1, 2]
 */
export const findTheWidthOfColumnsOfAGrid = (
	grid: readonly (readonly number[])[],
): number[] =>
	(grid[0] ?? []).map((_, c) =>
		Math.max(...grid.map((row) => String(row[c] ?? 0).length)),
	);

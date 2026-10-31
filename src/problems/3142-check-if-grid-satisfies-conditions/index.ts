/**
 * 3142. Check if Grid Satisfies Conditions
 *
 * Whether every cell equals the one below it and differs from the one to
 * its right.
 *
 * Check both neighbours of every cell.
 *
 * @see https://leetcode.com/problems/check-if-grid-satisfies-conditions/
 * @difficulty Easy
 * @timeComplexity O(m · n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfGridSatisfiesConditions([[1, 0, 2], [1, 0, 2]]); // true
 */
export const checkIfGridSatisfiesConditions = (
	grid: readonly (readonly number[])[],
): boolean =>
	grid.every((row, r) =>
		row.every(
			(cell, c) =>
				(r + 1 >= grid.length || grid[r + 1]?.[c] === cell) &&
				(c + 1 >= row.length || row[c + 1] !== cell),
		),
	);

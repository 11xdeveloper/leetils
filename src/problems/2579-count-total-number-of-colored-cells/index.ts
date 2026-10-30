/**
 * 2579. Count Total Number of Colored Cells
 *
 * On an infinite grid, one cell is coloured in the first minute, and each
 * minute after, every uncoloured cell touching a coloured one is
 * coloured. Returns the coloured cells after `n` minutes.
 *
 * The shape is a diamond: minute `k` adds a ring of `4(k - 1)` cells, so
 * the total is `1 + 2n(n - 1)`.
 *
 * @see https://leetcode.com/problems/count-total-number-of-colored-cells/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * countTotalNumberOfColoredCells(2); // 5
 */
export const countTotalNumberOfColoredCells = (n: number): number =>
	1 + 2 * n * (n - 1);

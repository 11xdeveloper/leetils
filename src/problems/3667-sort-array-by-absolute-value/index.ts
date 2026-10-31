/**
 * 3667. Sort Array By Absolute Value
 *
 * Sorts `nums` by absolute value (stably, so equal ones keep their order).
 *
 * @see https://leetcode.com/problems/sort-array-by-absolute-value/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * sortArrayByAbsoluteValue([3, -1, -4, 1, 5]); // [-1, 1, 3, -4, 5]
 */
export const sortArrayByAbsoluteValue = (nums: readonly number[]): number[] =>
	[...nums].sort((a, b) => Math.abs(a) - Math.abs(b));

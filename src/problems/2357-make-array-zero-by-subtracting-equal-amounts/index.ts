/**
 * 2357. Make Array Zero by Subtracting Equal Amounts
 *
 * An operation subtracts the smallest positive value from every positive
 * element. Returns the operations until all are zero.
 *
 * Each operation clears one distinct positive value.
 *
 * @see https://leetcode.com/problems/make-array-zero-by-subtracting-equal-amounts/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * makeArrayZeroBySubtractingEqualAmounts([1, 5, 0, 3, 5]); // 3
 */
export const makeArrayZeroBySubtractingEqualAmounts = (
	nums: readonly number[],
): number => new Set(nums.filter((num) => num > 0)).size;

/**
 * 775. Global and Local Inversions
 *
 * `nums` is a permutation of 0 to n - 1. Global inversions are pairs
 * `i < j` with `nums[i] > nums[j]`; local ones have `j = i + 1`. Returns
 * whether the two counts are equal.
 *
 * Every local inversion is global, so they're equal exactly when there's no
 * inversion between elements two or more apart. In a permutation that
 * means no element is more than one place from its sorted position.
 *
 * @see https://leetcode.com/problems/global-and-local-inversions/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * globalAndLocalInversions([1, 0, 2]); // true
 */
export const globalAndLocalInversions = (nums: readonly number[]): boolean =>
	nums.every((num, i) => Math.abs(num - i) <= 1);

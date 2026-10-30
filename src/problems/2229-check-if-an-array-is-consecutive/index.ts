/**
 * 2229. Check if an Array Is Consecutive
 *
 * Returns whether `nums` holds exactly the numbers from its minimum `x`
 * to `x + n - 1`.
 *
 * The values must be distinct and span exactly `n - 1`.
 *
 * @see https://leetcode.com/problems/check-if-an-array-is-consecutive/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfAnArrayIsConsecutive([1, 3, 4, 2]); // true
 */
export const checkIfAnArrayIsConsecutive = (nums: readonly number[]): boolean =>
	new Set(nums).size === nums.length &&
	Math.max(...nums) - Math.min(...nums) === nums.length - 1;

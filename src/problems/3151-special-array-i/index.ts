/**
 * 3151. Special Array I
 *
 * Whether every pair of neighbours in `nums` has one odd and one even
 * number.
 *
 * Check each pair's parities.
 *
 * @see https://leetcode.com/problems/special-array-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * specialArrayI([2, 1, 4]); // true
 */
export const specialArrayI = (nums: readonly number[]): boolean =>
	nums.every((num, i) => i === 0 || (num - (nums[i - 1] ?? 0)) % 2 !== 0);

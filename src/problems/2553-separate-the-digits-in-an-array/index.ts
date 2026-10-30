/**
 * 2553. Separate the Digits in an Array
 *
 * Returns the digits of each number in `nums`, in order.
 *
 * Split each number's decimal string.
 *
 * @see https://leetcode.com/problems/separate-the-digits-in-an-array/
 * @difficulty Easy
 * @timeComplexity O(total digits)
 * @spaceComplexity O(total digits)
 *
 * @example
 * separateTheDigitsInAnArray([13, 25, 83, 77]); // [1, 3, 2, 5, 8, 3, 7, 7]
 */
export const separateTheDigitsInAnArray = (nums: readonly number[]): number[] =>
	nums.flatMap((num) => [...String(num)].map(Number));

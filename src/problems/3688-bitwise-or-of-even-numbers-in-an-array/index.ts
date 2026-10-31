/**
 * 3688. Bitwise OR of Even Numbers in an Array
 *
 * The bitwise OR of the even elements of `nums` (0 if there are none).
 *
 * @see https://leetcode.com/problems/bitwise-or-of-even-numbers-in-an-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * bitwiseOrOfEvenNumbersInAnArray([1, 2, 3, 4, 5, 6]); // 6
 */
export const bitwiseOrOfEvenNumbersInAnArray = (
	nums: readonly number[],
): number => nums.reduce((or, num) => (num % 2 === 0 ? or | num : or), 0);

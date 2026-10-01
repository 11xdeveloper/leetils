/**
 * 258. Add Digits
 *
 * Repeatedly adds the digits of the non-negative integer `num` until a
 * single digit remains, and returns it.
 *
 * The result is the digital root, which follows from the fact that a
 * number and the sum of its digits leave the same remainder when divided by
 * 9. It's 0 for 0, and otherwise `1 + (num - 1) % 9`, with no loop.
 *
 * @see https://leetcode.com/problems/add-digits/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * addDigits(38); // 2: 3 + 8 = 11, then 1 + 1 = 2
 */
export const addDigits = (num: number): number =>
	num === 0 ? 0 : 1 + ((num - 1) % 9);

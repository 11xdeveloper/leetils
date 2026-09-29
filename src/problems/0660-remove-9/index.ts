/**
 * 660. Remove 9
 *
 * Removing every integer containing the digit 9 from 1, 2, 3, … leaves
 * 1, …, 8, 10, 11, …. Returns the `n`th integer (from 1) of what's left.
 *
 * The remaining numbers use only digits 0 to 8, in order, so they're
 * exactly the base-9 numerals: the answer is `n` written in base 9, read as
 * decimal.
 *
 * @see https://leetcode.com/problems/remove-9/
 * @difficulty Hard
 * @timeComplexity O(log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * remove9(9); // 10
 */
export const remove9 = (n: number): number => Number(n.toString(9));

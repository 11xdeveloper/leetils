/**
 * 1323. Maximum 69 Number
 *
 * `num` is made of 6s and 9s. Returns the largest number reachable by
 * changing at most one digit (6 to 9 or 9 to 6).
 *
 * Turning the first 6 into a 9 gains the most; if there's no 6, leave it.
 *
 * @see https://leetcode.com/problems/maximum-69-number/
 * @difficulty Easy
 * @timeComplexity O(log num)
 * @spaceComplexity O(log num)
 *
 * @example
 * maximum69Number(9669); // 9969
 */
export const maximum69Number = (num: number): number =>
	Number(String(num).replace("6", "9"));

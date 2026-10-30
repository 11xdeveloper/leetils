/**
 * 2802. Find The K-th Lucky Number
 *
 * Lucky numbers use only the digits 4 and 7. Returns the `k`-th smallest
 * as a string.
 *
 * Lucky numbers of each length count up like binary with 4 as 0 and 7 as
 * 1, so write `k + 1` in binary and drop its leading 1.
 *
 * @see https://leetcode.com/problems/find-the-k-th-lucky-number/
 * @difficulty Medium
 * @timeComplexity O(log k)
 * @spaceComplexity O(log k)
 *
 * @example
 * findTheKThLuckyNumber(10); // "477"
 */
export const findTheKThLuckyNumber = (k: number): string =>
	(k + 1).toString(2).slice(1).replaceAll("0", "4").replaceAll("1", "7");

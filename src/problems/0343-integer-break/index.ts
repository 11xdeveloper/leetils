/**
 * 343. Integer Break
 *
 * Splits `n` into at least two positive integers that add up to it, and
 * returns the largest possible product of those integers.
 *
 * For any part of 5 or more, splitting it into 3 and the rest gives a larger
 * product, and 4 = 2 + 2 is as good as 4. So the best split uses as many 3s
 * as possible, with a 4 (or 2) making up the remainder. `n` of 2 and 3 must
 * still be split, so they're special cases.
 *
 * @see https://leetcode.com/problems/integer-break/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * integerBreak(10); // 36: 3 + 3 + 4
 */
export const integerBreak = (n: number): number => {
	if (n <= 3) return n - 1;
	const threes = Math.floor(n / 3);
	const remainder = n % 3;
	if (remainder === 0) return 3 ** threes;
	if (remainder === 1) return 3 ** (threes - 1) * 4;
	return 3 ** threes * 2;
};

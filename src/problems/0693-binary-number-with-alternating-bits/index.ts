/**
 * 693. Binary Number with Alternating Bits
 *
 * Returns whether every pair of adjacent bits of the positive integer `n`
 * differs, as in `101`.
 *
 * With alternating bits, `n ^ (n >> 1)` is all ones, and a number `x` is
 * all ones exactly when `x & (x + 1)` is 0.
 *
 * @see https://leetcode.com/problems/binary-number-with-alternating-bits/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * binaryNumberWithAlternatingBits(5); // true: 101
 */
export const binaryNumberWithAlternatingBits = (n: number): boolean => {
	const ones = n ^ (n >> 1);
	return (ones & (ones + 1)) === 0;
};

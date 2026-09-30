/**
 * 1009. Complement of Base 10 Integer
 *
 * Returns the complement of `n`: its binary representation, without leading
 * zeros, with every bit flipped. The complement of 0 is 1.
 *
 * Subtracts `n` from the number of all 1 bits of the same length.
 *
 * @see https://leetcode.com/problems/complement-of-base-10-integer/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * complementOfBase10Integer(5); // 2
 */
export const complementOfBase10Integer = (n: number): number =>
	n === 0 ? 1 : 2 ** (32 - Math.clz32(n)) - 1 - n;

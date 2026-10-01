/**
 * 476. Number Complement
 *
 * Returns the complement of `num`: its binary representation, without
 * leading zeros, with every bit flipped.
 *
 * For a `k`-bit number, flipping the bits is subtracting it from the `k`-bit
 * number of all ones, `2^k - 1`.
 *
 * @see https://leetcode.com/problems/number-complement/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * numberComplement(5); // 2: 101 becomes 010
 */
export const numberComplement = (num: number): number =>
	2 ** (32 - Math.clz32(num)) - 1 - num;

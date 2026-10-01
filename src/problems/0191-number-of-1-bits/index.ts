/**
 * 191. Number of 1 Bits
 *
 * Returns how many bits are set in the binary form of a positive integer
 * (its Hamming weight).
 *
 * `n & (n - 1)` clears the lowest set bit, so the loop runs once per set bit
 * rather than once per bit.
 *
 * @see https://leetcode.com/problems/number-of-1-bits/
 * @difficulty Easy
 * @timeComplexity O(1), at most 32 iterations
 * @spaceComplexity O(1)
 *
 * @example
 * numberOf1Bits(11); // 3, since 11 is 1011 in binary
 */
export const numberOf1Bits = (n: number): number => {
	let count = 0;

	for (let rest = n >>> 0; rest !== 0; rest = (rest & (rest - 1)) >>> 0)
		count++;

	return count;
};

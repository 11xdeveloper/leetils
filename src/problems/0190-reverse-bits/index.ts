/**
 * 190. Reverse Bits
 *
 * Reverses the 32 bits of an unsigned 32-bit integer, returning the result as
 * an unsigned integer.
 *
 * Shifts the bits out of `n` from the lowest end and into the result from
 * the highest end. `>>> 0` keeps the result unsigned, since JavaScript's
 * bitwise operators otherwise produce signed 32-bit integers.
 *
 * @see https://leetcode.com/problems/reverse-bits/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * reverseBits(43261596); // 964176192
 */
export const reverseBits = (n: number): number => {
	let reversed = 0;
	let rest = n;

	for (let i = 0; i < 32; i++) {
		reversed = (reversed << 1) | (rest & 1);
		rest >>>= 1;
	}

	return reversed >>> 0;
};

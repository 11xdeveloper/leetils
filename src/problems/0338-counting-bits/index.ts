/**
 * 338. Counting Bits
 *
 * Returns, for every `i` from 0 to `n`, how many 1 bits `i` has.
 *
 * `i` has the bits of `i >> 1` plus its own lowest bit, so each count
 * follows from one already computed.
 *
 * @see https://leetcode.com/problems/counting-bits/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n) for the returned counts
 *
 * @example
 * countingBits(5); // [0, 1, 1, 2, 1, 2]
 */
export const countingBits = (n: number): number[] => {
	const bits = [0];
	for (let i = 1; i <= n; i++) bits.push((bits[i >> 1] ?? 0) + (i & 1));
	return bits;
};

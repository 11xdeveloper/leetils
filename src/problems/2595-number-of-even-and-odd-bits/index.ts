/**
 * 2595. Number of Even and Odd Bits
 *
 * Returns how many set bits of `n` sit at even indices and how many at
 * odd ones, counting from the least significant bit as index 0.
 *
 * Count the set bits under alternating masks.
 *
 * @see https://leetcode.com/problems/number-of-even-and-odd-bits/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfEvenAndOddBits(50); // [1, 2]
 */
export const numberOfEvenAndOddBits = (n: number): number[] => {
	const counts = [0, 0];
	for (let bit = 0; n >> bit; bit++)
		if ((n >> bit) & 1) counts[bit % 2] = (counts[bit % 2] ?? 0) + 1;
	return counts;
};

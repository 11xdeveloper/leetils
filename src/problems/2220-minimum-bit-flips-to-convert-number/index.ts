/**
 * 2220. Minimum Bit Flips to Convert Number
 *
 * Returns how many bits differ between `start` and `goal`.
 *
 * Count the set bits of their XOR.
 *
 * @see https://leetcode.com/problems/minimum-bit-flips-to-convert-number/
 * @difficulty Easy
 * @timeComplexity O(log max)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumBitFlipsToConvertNumber(10, 7); // 3
 */
export const minimumBitFlipsToConvertNumber = (
	start: number,
	goal: number,
): number => {
	let flips = 0;
	for (let bits = start ^ goal; bits; bits &= bits - 1) flips++;
	return flips;
};

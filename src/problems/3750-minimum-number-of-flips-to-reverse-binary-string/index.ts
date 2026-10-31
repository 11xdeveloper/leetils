/**
 * 3750. Minimum Number of Flips to Reverse Binary String
 *
 * Counts the bit flips that turn the binary form of `n` into its reverse:
 * the positions where it differs from its mirror.
 *
 * @see https://leetcode.com/problems/minimum-number-of-flips-to-reverse-binary-string/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * minimumNumberOfFlipsToReverseBinaryString(10); // 4
 */
export const minimumNumberOfFlipsToReverseBinaryString = (
	n: number,
): number => {
	const bits = n.toString(2);
	let flips = 0;
	for (let i = 0; i < bits.length; i++)
		if (bits[i] !== bits[bits.length - 1 - i]) flips++;
	return flips;
};

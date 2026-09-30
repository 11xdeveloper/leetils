/**
 * 868. Binary Gap
 *
 * Returns the longest distance between two adjacent 1 bits of `n`, or 0 if
 * it has fewer than two.
 *
 * Walks the bits from the lowest, measuring from each 1 to the next.
 *
 * @see https://leetcode.com/problems/binary-gap/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * binaryGap(22); // 2: 10110
 */
export const binaryGap = (n: number): number => {
	let longest = 0;
	let last = -1;
	for (let bit = 0; n > 0; bit++, n = Math.floor(n / 2)) {
		if (n % 2 !== 1) continue;
		if (last >= 0) longest = Math.max(longest, bit - last);
		last = bit;
	}
	return longest;
};

/**
 * 3950. Exactly One Consecutive Set Bits Pair
 *
 * Whether `n`'s binary form has exactly one pair of neighbouring 1 bits:
 * n & (n >> 1) marks each such pair, so it must be a single bit.
 *
 * @see https://leetcode.com/problems/exactly-one-consecutive-set-bits-pair/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * exactlyOneConsecutiveSetBitsPair(6); // true
 */
export const exactlyOneConsecutiveSetBitsPair = (n: number): boolean => {
	const pairs = n & (n >> 1);
	return pairs !== 0 && (pairs & (pairs - 1)) === 0;
};

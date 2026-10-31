/**
 * 3550. Smallest Index With Digit Sum Equal to Index
 *
 * The smallest index i whose element's digit sum is i, or -1.
 *
 * Check each index in order.
 *
 * @see https://leetcode.com/problems/smallest-index-with-digit-sum-equal-to-index/
 * @difficulty Easy
 * @timeComplexity O(n log max)
 * @spaceComplexity O(1)
 *
 * @example
 * smallestIndexWithDigitSumEqualToIndex([1, 3, 2]); // 2
 */
export const smallestIndexWithDigitSumEqualToIndex = (
	nums: readonly number[],
): number =>
	nums.findIndex(
		(num, i) => [...String(num)].reduce((sum, d) => sum + Number(d), 0) === i,
	);

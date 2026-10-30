/**
 * 2859. Sum of Values at Indices With K Set Bits
 *
 * Returns the sum of the elements whose index has exactly `k` set bits.
 *
 * Count each index's bits.
 *
 * @see https://leetcode.com/problems/sum-of-values-at-indices-with-k-set-bits/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfValuesAtIndicesWithKSetBits([5, 10, 1, 5, 2], 1); // 13
 */
export const sumOfValuesAtIndicesWithKSetBits = (
	nums: readonly number[],
	k: number,
): number =>
	nums.reduce(
		(sum, num, i) =>
			i.toString(2).replaceAll("0", "").length === k ? sum + num : sum,
		0,
	);

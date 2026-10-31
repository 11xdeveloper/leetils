/**
 * 3684. Maximize Sum of At Most K Distinct Elements
 *
 * Choose at most `k` distinct values from `nums` (all positive) with the
 * largest sum. Returns them in decreasing order.
 *
 * Take the k largest distinct values.
 *
 * @see https://leetcode.com/problems/maximize-sum-of-at-most-k-distinct-elements/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeSumOfAtMostKDistinctElements([84, 93, 100, 77, 93], 3); // [100, 93, 84]
 */
export const maximizeSumOfAtMostKDistinctElements = (
	nums: readonly number[],
	k: number,
): number[] => [...new Set(nums)].sort((a, b) => b - a).slice(0, k);

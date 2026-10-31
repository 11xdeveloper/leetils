/**
 * 3065. Minimum Operations to Exceed Threshold Value I
 *
 * The fewest removals of the smallest element needed to leave every element
 * of `nums` at least `k`.
 *
 * Exactly the elements below `k` have to go.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-exceed-threshold-value-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToExceedThresholdValueI([2, 11, 10, 1, 3], 10); // 3
 */
export const minimumOperationsToExceedThresholdValueI = (
	nums: readonly number[],
	k: number,
): number => nums.filter((num) => num < k).length;

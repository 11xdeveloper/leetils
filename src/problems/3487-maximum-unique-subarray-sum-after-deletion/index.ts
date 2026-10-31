/**
 * 3487. Maximum Unique Subarray Sum After Deletion
 *
 * Delete any elements of `nums` (leaving at least one), then pick a
 * subarray with distinct elements. Returns the largest sum possible.
 *
 * Deleting everything else leaves the distinct positive values side by
 * side; if there are none, the best is the single largest element.
 *
 * @see https://leetcode.com/problems/maximum-unique-subarray-sum-after-deletion/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumUniqueSubarraySumAfterDeletion([1, 2, -1, -2, 1, 0, -1]); // 3
 */
export const maximumUniqueSubarraySumAfterDeletion = (
	nums: readonly number[],
): number => {
	const positives = [...new Set(nums.filter((num) => num > 0))];
	return positives.length > 0
		? positives.reduce((a, b) => a + b, 0)
		: Math.max(...nums);
};

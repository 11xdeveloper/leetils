/**
 * 1800. Maximum Ascending Subarray Sum
 *
 * Returns the largest sum of a strictly increasing subarray of `nums`.
 *
 * Keeps a running sum that restarts whenever the sequence stops rising.
 *
 * @see https://leetcode.com/problems/maximum-ascending-subarray-sum/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumAscendingSubarraySum([10, 20, 30, 5, 10, 50]); // 65
 */
export const maximumAscendingSubarraySum = (
	nums: readonly number[],
): number => {
	let [sum, best] = [0, 0];
	for (const [i, num] of nums.entries()) {
		sum = i > 0 && num > (nums[i - 1] ?? 0) ? sum + num : num;
		best = Math.max(best, sum);
	}
	return best;
};

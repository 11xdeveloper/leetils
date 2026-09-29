/**
 * 643. Maximum Average Subarray I
 *
 * Returns the largest average of any `k` consecutive elements of `nums`.
 *
 * Slides a window of `k` elements along, updating its sum by the element
 * entering and the one leaving, and keeps the largest sum.
 *
 * @see https://leetcode.com/problems/maximum-average-subarray-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumAverageSubarrayI([1, 12, -5, -6, 50, 3], 4); // 12.75
 */
export const maximumAverageSubarrayI = (
	nums: readonly number[],
	k: number,
): number => {
	let sum = 0;
	for (let i = 0; i < k; i++) sum += nums[i] ?? 0;
	let best = sum;
	for (let i = k; i < nums.length; i++) {
		sum += (nums[i] ?? 0) - (nums[i - k] ?? 0);
		best = Math.max(best, sum);
	}
	return best / k;
};

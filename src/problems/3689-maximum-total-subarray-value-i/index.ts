/**
 * 3689. Maximum Total Subarray Value I
 *
 * Choose `k` subarrays, repeats allowed, each worth its maximum minus its
 * minimum. Returns the largest total.
 *
 * The whole array is worth the most, so choose it k times.
 *
 * @see https://leetcode.com/problems/maximum-total-subarray-value-i/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumTotalSubarrayValueI([4, 2, 5, 1], 3); // 12
 */
export const maximumTotalSubarrayValueI = (
	nums: readonly number[],
	k: number,
): number => k * (Math.max(...nums) - Math.min(...nums));

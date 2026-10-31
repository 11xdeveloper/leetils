/**
 * 2036. Maximum Alternating Subarray Sum
 *
 * A subarray's alternating sum adds its first element, subtracts the
 * second, and so on. Returns the largest alternating subarray sum.
 *
 * Track the best sum of a subarray ending here with the last element
 * added, and with it subtracted. Adding either extends a subtracting run
 * or starts afresh; subtracting must extend an adding one.
 *
 * @see https://leetcode.com/problems/maximum-alternating-subarray-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumAlternatingSubarraySum([3, -1, 1, 2]); // 5
 */
export const maximumAlternatingSubarraySum = (
	nums: readonly number[],
): number => {
	let [added, subtracted, best] = [-Infinity, -Infinity, -Infinity];
	for (const num of nums) {
		[added, subtracted] = [Math.max(subtracted, 0) + num, added - num];
		best = Math.max(best, added, subtracted);
	}
	return best;
};

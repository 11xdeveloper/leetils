/**
 * 3196. Maximize Total Cost of Alternating Subarrays
 *
 * Split `nums` into subarrays, where a subarray costs
 * `nums[l] - nums[l + 1] + nums[l + 2] - …`. Returns the largest total cost.
 *
 * Every element is added or subtracted, the first is always added, and an
 * element can only be subtracted right after one that's added (starting a
 * new subarray resets the sign). Track the best total ending each way.
 *
 * @see https://leetcode.com/problems/maximize-total-cost-of-alternating-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximizeTotalCostOfAlternatingSubarrays([1, -2, 3, 4]); // 10
 */
export const maximizeTotalCostOfAlternatingSubarrays = (
	nums: readonly number[],
): number => {
	let added = nums[0] ?? 0;
	let subtracted = Number.NEGATIVE_INFINITY;
	for (let i = 1; i < nums.length; i++) {
		const num = nums[i] ?? 0;
		[added, subtracted] = [Math.max(added, subtracted) + num, added - num];
	}
	return Math.max(added, subtracted);
};

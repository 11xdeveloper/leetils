/**
 * 2874. Maximum Value of an Ordered Triplet II
 *
 * Returns the largest `(nums[i] - nums[j]) · nums[k]` over `i < j < k`,
 * or 0 if every triplet is negative, for arrays too long to check every
 * triplet.
 *
 * Sweep once, tracking the largest element so far and the largest
 * difference `nums[i] - nums[j]` so far.
 *
 * @see https://leetcode.com/problems/maximum-value-of-an-ordered-triplet-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumValueOfAnOrderedTripletII([1, 10, 3, 4, 19]); // 133
 */
export const maximumValueOfAnOrderedTripletII = (
	nums: readonly number[],
): number => {
	let best = 0;
	let largest = 0;
	let difference = 0;
	for (const num of nums) {
		best = Math.max(best, difference * num);
		difference = Math.max(difference, largest - num);
		largest = Math.max(largest, num);
	}
	return best;
};

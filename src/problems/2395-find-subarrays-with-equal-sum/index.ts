/**
 * 2395. Find Subarrays With Equal Sum
 *
 * Returns whether two different length-2 subarrays have the same sum.
 *
 * @see https://leetcode.com/problems/find-subarrays-with-equal-sum/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findSubarraysWithEqualSum([4, 2, 4]); // true
 */
export const findSubarraysWithEqualSum = (nums: readonly number[]): boolean => {
	const sums = new Set<number>();
	for (let i = 1; i < nums.length; i++) {
		const sum = (nums[i - 1] ?? 0) + (nums[i] ?? 0);
		if (sums.has(sum)) return true;
		sums.add(sum);
	}
	return false;
};

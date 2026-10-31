/**
 * 3392. Count Subarrays of Length Three With a Condition
 *
 * Count the length-3 subarrays whose first and last elements add up to
 * exactly half the middle one.
 *
 * Check every window, comparing twice the sum with the middle to stay in
 * integers.
 *
 * @see https://leetcode.com/problems/count-subarrays-of-length-three-with-a-condition/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countSubarraysOfLengthThreeWithACondition([1, 2, 1, 4, 1]); // 1
 */
export const countSubarraysOfLengthThreeWithACondition = (
	nums: readonly number[],
): number => {
	let count = 0;
	for (let i = 0; i + 2 < nums.length; i++)
		if (2 * ((nums[i] ?? 0) + (nums[i + 2] ?? 0)) === nums[i + 1]) count++;
	return count;
};

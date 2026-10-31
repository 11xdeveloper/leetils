/**
 * 3737. Count Subarrays With Majority Element I
 *
 * Counts subarrays in which `target` makes up more than half the
 * elements.
 *
 * Extend from every start, tracking the target's count.
 *
 * @see https://leetcode.com/problems/count-subarrays-with-majority-element-i/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(1)
 *
 * @example
 * countSubarraysWithMajorityElementI([1, 2, 2, 3], 2); // 5
 */
export const countSubarraysWithMajorityElementI = (
	nums: readonly number[],
	target: number,
): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		let hits = 0;
		for (let j = i; j < nums.length; j++) {
			if (nums[j] === target) hits++;
			if (2 * hits > j - i + 1) count++;
		}
	}
	return count;
};

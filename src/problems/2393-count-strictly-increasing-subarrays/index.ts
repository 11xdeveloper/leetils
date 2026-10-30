/**
 * 2393. Count Strictly Increasing Subarrays
 *
 * Counts the strictly increasing subarrays of `nums`.
 *
 * An element ending a strictly increasing run of length `r` ends `r` of
 * them.
 *
 * @see https://leetcode.com/problems/count-strictly-increasing-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countStrictlyIncreasingSubarrays([1, 3, 5, 4, 4, 6]); // 10
 */
export const countStrictlyIncreasingSubarrays = (
	nums: readonly number[],
): number => {
	let [count, run] = [0, 0];
	for (const [i, num] of nums.entries()) {
		run = i > 0 && num > (nums[i - 1] ?? 0) ? run + 1 : 1;
		count += run;
	}
	return count;
};

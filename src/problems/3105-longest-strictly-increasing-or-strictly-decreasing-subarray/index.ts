/**
 * 3105. Longest Strictly Increasing or Strictly Decreasing Subarray
 *
 * The length of the longest subarray of `nums` that's strictly increasing
 * or strictly decreasing.
 *
 * Track the increasing and decreasing runs ending at each index.
 *
 * @see https://leetcode.com/problems/longest-strictly-increasing-or-strictly-decreasing-subarray/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * longestStrictlyIncreasingOrStrictlyDecreasingSubarray([1, 4, 3, 3, 2]); // 2
 */
export const longestStrictlyIncreasingOrStrictlyDecreasingSubarray = (
	nums: readonly number[],
): number => {
	let best = 1;
	let up = 1;
	let down = 1;
	for (let i = 1; i < nums.length; i++) {
		const [a = 0, b = 0] = [nums[i - 1], nums[i]];
		up = b > a ? up + 1 : 1;
		down = b < a ? down + 1 : 1;
		best = Math.max(best, up, down);
	}
	return best;
};

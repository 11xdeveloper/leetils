/**
 * 674. Longest Continuous Increasing Subsequence
 *
 * Returns the length of the longest strictly increasing run of consecutive
 * elements in `nums`.
 *
 * Tracks the current run, restarting whenever an element isn't larger than
 * the one before.
 *
 * @see https://leetcode.com/problems/longest-continuous-increasing-subsequence/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * longestContinuousIncreasingSubsequence([1, 3, 5, 4, 7]); // 3
 */
export const longestContinuousIncreasingSubsequence = (
	nums: readonly number[],
): number => {
	let longest = 0;
	let run = 0;
	for (const [i, num] of nums.entries()) {
		run = i > 0 && num > (nums[i - 1] ?? 0) ? run + 1 : 1;
		longest = Math.max(longest, run);
	}
	return longest;
};

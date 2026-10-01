/**
 * 376. Wiggle Subsequence
 *
 * Returns the length of the longest subsequence of `nums` whose successive
 * differences strictly alternate between positive and negative. A single
 * element, or two different elements, count as wiggles.
 *
 * Tracks the longest wiggle ending with a rise and ending with a fall. A
 * rise can extend any wiggle that ended with a fall, and vice versa; equal
 * neighbours change nothing.
 *
 * @see https://leetcode.com/problems/wiggle-subsequence/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * wiggleSubsequence([1, 7, 4, 9, 2, 5]); // 6
 */
export const wiggleSubsequence = (nums: readonly number[]): number => {
	let up = 1;
	let down = 1;

	for (let i = 1; i < nums.length; i++) {
		const difference = (nums[i] ?? 0) - (nums[i - 1] ?? 0);
		if (difference > 0) up = down + 1;
		else if (difference < 0) down = up + 1;
	}

	return Math.max(up, down);
};

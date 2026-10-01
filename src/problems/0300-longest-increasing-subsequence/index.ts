/**
 * 300. Longest Increasing Subsequence
 *
 * Returns the length of the longest strictly increasing subsequence of
 * `nums` (not necessarily contiguous).
 *
 * Patience sorting: `tails[i]` is the smallest value that can end an
 * increasing subsequence of length `i + 1`. The tails stay sorted, so each
 * number binary searches for the first tail at least as large and replaces
 * it, or extends the list if there is none. The list's length is the
 * answer.
 *
 * @see https://leetcode.com/problems/longest-increasing-subsequence/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18]); // 4, for [2, 3, 7, 101]
 */
export const longestIncreasingSubsequence = (
	nums: readonly number[],
): number => {
	const tails: number[] = [];

	for (const num of nums) {
		let low = 0;
		let high = tails.length;
		while (low < high) {
			const mid = Math.floor((low + high) / 2);
			if ((tails[mid] ?? 0) < num) low = mid + 1;
			else high = mid;
		}
		tails[low] = num;
	}

	return tails.length;
};

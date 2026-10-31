/**
 * 3231. Minimum Number of Increasing Subsequence to Be Removed
 *
 * The fewest strictly increasing subsequences that together use every
 * element of `nums` once.
 *
 * By Dilworth's theorem, that's the length of the longest non-increasing
 * subsequence, found with patience sorting.
 *
 * @see https://leetcode.com/problems/minimum-number-of-increasing-subsequence-to-be-removed/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfIncreasingSubsequenceToBeRemoved([5, 3, 1, 4, 2]); // 3
 */
export const minimumNumberOfIncreasingSubsequenceToBeRemoved = (
	nums: readonly number[],
): number => {
	// tails[i]: the largest last element of a non-increasing run of length i + 1.
	const tails: number[] = [];
	for (const num of nums) {
		let lo = 0;
		let hi = tails.length;
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((tails[mid] ?? 0) >= num) lo = mid + 1;
			else hi = mid;
		}
		tails[lo] = num;
	}
	return tails.length;
};

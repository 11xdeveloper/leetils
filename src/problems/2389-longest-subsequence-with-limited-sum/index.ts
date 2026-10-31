/**
 * 2389. Longest Subsequence With Limited Sum
 *
 * Returns, for each query, the size of the largest subsequence of `nums`
 * with sum at most the query.
 *
 * Take the smallest numbers: binary search the sorted prefix sums.
 *
 * @see https://leetcode.com/problems/longest-subsequence-with-limited-sum/
 * @difficulty Easy
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestSubsequenceWithLimitedSum([4, 5, 2, 1], [3, 10, 21]); // [2, 3, 4]
 */
export const longestSubsequenceWithLimitedSum = (
	nums: readonly number[],
	queries: readonly number[],
): number[] => {
	const prefix: number[] = [];
	for (const num of nums.toSorted((a, b) => a - b))
		prefix.push((prefix.at(-1) ?? 0) + num);
	return queries.map((query) => {
		let [lo, hi] = [0, prefix.length];
		while (lo < hi) {
			const mid = (lo + hi) >> 1;
			if ((prefix[mid] ?? 0) <= query) lo = mid + 1;
			else hi = mid;
		}
		return lo;
	});
};

/**
 * 2407. Longest Increasing Subsequence II
 *
 * Returns the length of the longest strictly increasing subsequence whose
 * adjacent values differ by at most `k`.
 *
 * A segment tree indexed by value holds the longest subsequence ending at
 * each value; each number extends the best ending in `[num - k, num - 1]`.
 *
 * @see https://leetcode.com/problems/longest-increasing-subsequence-ii/
 * @difficulty Hard
 * @timeComplexity O(n log V)
 * @spaceComplexity O(V)
 *
 * @example
 * longestIncreasingSubsequenceII([4, 2, 1, 4, 3, 4, 5, 8, 15], 3); // 5
 */
export const longestIncreasingSubsequenceII = (
	nums: readonly number[],
	k: number,
): number => {
	const size = Math.max(...nums) + 1;
	const tree = new Int32Array(2 * size);
	const query = (lo: number, hi: number): number => {
		let best = 0;
		for (lo += size, hi += size + 1; lo < hi; lo >>= 1, hi >>= 1) {
			if (lo & 1) best = Math.max(best, tree[lo++] ?? 0);
			if (hi & 1) best = Math.max(best, tree[--hi] ?? 0);
		}
		return best;
	};
	let answer = 0;
	for (const num of nums) {
		const length = query(Math.max(0, num - k), num - 1) + 1;
		answer = Math.max(answer, length);
		for (let i = num + size; i > 0; i >>= 1)
			tree[i] = Math.max(tree[i] ?? 0, length);
	}
	return answer;
};

/**
 * 3825. Longest Strictly Increasing Subsequence With Non-Zero Bitwise AND
 *
 * The longest strictly increasing subsequence whose AND isn't 0, or 0.
 *
 * A non-zero AND shares some bit, so for each bit take the longest
 * strictly increasing subsequence of the elements having it (patience
 * sorting).
 *
 * @see https://leetcode.com/problems/longest-strictly-increasing-subsequence-with-non-zero-bitwise-and/
 * @difficulty Medium
 * @timeComplexity O(n log n · log V)
 * @spaceComplexity O(n)
 *
 * @example
 * longestStrictlyIncreasingSubsequenceWithNonZeroBitwiseAnd([2, 3, 6]); // 3
 */
export const longestStrictlyIncreasingSubsequenceWithNonZeroBitwiseAnd = (
	nums: readonly number[],
): number => {
	let best = 0;
	for (let bit = 0; bit < 30; bit++) {
		const tails: number[] = [];
		for (const num of nums) {
			if (!((num >> bit) & 1)) continue;
			let [lo, hi] = [0, tails.length];
			while (lo < hi) {
				const mid = (lo + hi) >>> 1;
				if ((tails[mid] ?? 0) < num) lo = mid + 1;
				else hi = mid;
			}
			tails[lo] = num;
		}
		best = Math.max(best, tails.length);
	}
	return best;
};

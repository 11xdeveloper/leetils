/**
 * 3409. Longest Subsequence With Decreasing Adjacent Difference
 *
 * The longest subsequence of `nums` whose absolute differences between
 * neighbours never increase.
 *
 * Values are at most 300. Keep, for each value v and difference d, the
 * longest subsequence ending in v whose last difference is at least d (a
 * single element counts with any). A new element x can follow any value v
 * whose entry for |x - v| exists.
 *
 * @see https://leetcode.com/problems/longest-subsequence-with-decreasing-adjacent-difference/
 * @difficulty Medium
 * @timeComplexity O(n · V), for values up to V
 * @spaceComplexity O(V²)
 *
 * @example
 * longestSubsequenceWithDecreasingAdjacentDifference([16, 6, 3]); // 3
 */
export const longestSubsequenceWithDecreasingAdjacentDifference = (
	nums: readonly number[],
): number => {
	const top = Math.max(...nums);
	const size = top + 1;
	// atLeast[v * size + d]: longest ending in v with last difference at least d.
	const atLeast = new Int32Array(size * size);
	let best = 0;
	for (const x of nums) {
		const exact = new Int32Array(size);
		for (let v = 0; v <= top; v++) {
			const d = Math.abs(x - v);
			const before = atLeast[v * size + d] ?? 0;
			if (before > 0) exact[d] = Math.max(exact[d] ?? 0, before + 1);
		}
		let running = 1;
		for (let d = top; d >= 0; d--) {
			running = Math.max(running, exact[d] ?? 0);
			const at = x * size + d;
			atLeast[at] = Math.max(atLeast[at] ?? 0, running);
		}
		best = Math.max(best, running);
	}
	return best;
};

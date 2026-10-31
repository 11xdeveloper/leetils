/**
 * 3472. Longest Palindromic Subsequence After at Most K Operations
 *
 * With up to `k` operations, each moving a letter one place round the
 * alphabet, returns the longest palindromic subsequence possible.
 *
 * Interval dynamic programming with a budget: the ends of a range either
 * pair up, paying the cyclic distance between them, or one is skipped.
 *
 * @see https://leetcode.com/problems/longest-palindromic-subsequence-after-at-most-k-operations/
 * @difficulty Medium
 * @timeComplexity O(n² · k)
 * @spaceComplexity O(n · k)
 *
 * @example
 * longestPalindromicSubsequenceAfterAtMostKOperations("abced", 2); // 3
 */
export const longestPalindromicSubsequenceAfterAtMostKOperations = (
	s: string,
	k: number,
): number => {
	const n = s.length;
	const width = k + 1;
	// rows[i][j * width + b]: best for s[i..j] with budget b; only rows i and i + 1 are kept.
	let below = new Int32Array(n * width);
	for (let i = n - 1; i >= 0; i--) {
		const row = new Int32Array(n * width);
		for (let b = 0; b <= k; b++) row[i * width + b] = 1;
		for (let j = i + 1; j < n; j++) {
			const gap = Math.abs(s.charCodeAt(i) - s.charCodeAt(j));
			const cost = Math.min(gap, 26 - gap);
			for (let b = 0; b <= k; b++) {
				let best = Math.max(
					below[j * width + b] ?? 0,
					row[(j - 1) * width + b] ?? 0,
				);
				if (cost <= b)
					best = Math.max(
						best,
						2 + (j - 1 >= i + 1 ? (below[(j - 1) * width + b - cost] ?? 0) : 0),
					);
				row[j * width + b] = best;
			}
		}
		below = row;
	}
	return below[(n - 1) * width + k] ?? 0;
};

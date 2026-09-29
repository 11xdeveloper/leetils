/**
 * 516. Longest Palindromic Subsequence
 *
 * Returns the length of the longest subsequence of `s` that reads the same
 * backwards.
 *
 * Interval DP: for `s[i..j]`, matching ends add 2 to the best inside them;
 * otherwise drop one end or the other. Iterating `i` downwards needs only
 * the previous row.
 *
 * @see https://leetcode.com/problems/longest-palindromic-subsequence/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * longestPalindromicSubsequence("bbbab"); // 4: "bbbb"
 */
export const longestPalindromicSubsequence = (s: string): number => {
	const n = s.length;
	// longest[j] is the answer for s[i..j] with the current i; previous holds it for i + 1.
	let previous = new Array<number>(n).fill(0);

	for (let i = n - 1; i >= 0; i--) {
		const longest = new Array<number>(n).fill(0);
		longest[i] = 1;
		for (let j = i + 1; j < n; j++) {
			longest[j] =
				s.charAt(i) === s.charAt(j)
					? (previous[j - 1] ?? 0) + 2
					: Math.max(previous[j] ?? 0, longest[j - 1] ?? 0);
		}
		previous = longest;
	}

	return previous[n - 1] ?? 0;
};

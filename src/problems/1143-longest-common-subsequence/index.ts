/**
 * 1143. Longest Common Subsequence
 *
 * Returns the length of the longest common subsequence of `text1` and
 * `text2`.
 *
 * The classic dynamic programme over prefixes, keeping one row: matching
 * last characters extend the diagonal, otherwise drop a character from one
 * string or the other.
 *
 * @see https://leetcode.com/problems/longest-common-subsequence/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(n)
 *
 * @example
 * longestCommonSubsequence("abcde", "ace"); // 3
 */
export const longestCommonSubsequence = (
	text1: string,
	text2: string,
): number => {
	const n = text2.length;
	const row = new Array<number>(n + 1).fill(0);
	for (const char of text1) {
		let diagonal = 0;
		for (let j = 1; j <= n; j++) {
			const above = row[j] ?? 0;
			row[j] =
				char === text2[j - 1] ? diagonal + 1 : Math.max(above, row[j - 1] ?? 0);
			diagonal = above;
		}
	}
	return row[n] ?? 0;
};

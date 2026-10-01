/**
 * 1682. Longest Palindromic Subsequence II
 *
 * Returns the length of the longest even-length palindromic subsequence of
 * `s` with no two equal adjacent characters, except the middle pair.
 *
 * `best[i][j][c]` is the longest such subsequence within `s[i … j]` whose
 * outer letter is `c`. If `s[i]` and `s[j]` are both `c`, wrap them around
 * the best inner one with a different outer letter; also try dropping
 * either end.
 *
 * @see https://leetcode.com/problems/longest-palindromic-subsequence-ii/
 * @difficulty Medium
 * @timeComplexity O(26^2 · n^2)
 * @spaceComplexity O(26 · n^2)
 *
 * @example
 * longestPalindromicSubsequenceII("bbabab"); // 4
 */
export const longestPalindromicSubsequenceII = (s: string): number => {
	const n = s.length;
	const codes = Array.from(s, (char) => char.charCodeAt(0) - 97);
	// best[(i · n + j) · 26 + c]
	const best = new Int16Array(n * n * 26);
	const at = (i: number, j: number, c: number) =>
		i < j ? (best[(i * n + j) * 26 + c] ?? 0) : 0;
	/** The longest inner subsequence of s[i … j] whose outer letter isn't c. */
	const innerAvoiding = (i: number, j: number, c: number) => {
		let longest = 0;
		for (let other = 0; other < 26; other++)
			if (other !== c) longest = Math.max(longest, at(i, j, other));
		return longest;
	};
	for (let length = 2; length <= n; length++) {
		for (let i = 0; i + length - 1 < n; i++) {
			const j = i + length - 1;
			const [first, last] = [codes[i] ?? 0, codes[j] ?? 0];
			for (let c = 0; c < 26; c++) {
				let value = Math.max(at(i + 1, j, c), at(i, j - 1, c));
				if (first === c && last === c)
					value = Math.max(value, 2 + innerAvoiding(i + 1, j - 1, c));
				best[(i * n + j) * 26 + c] = value;
			}
		}
	}
	let longest = 0;
	for (let c = 0; c < 26; c++) longest = Math.max(longest, at(0, n - 1, c));
	return longest;
};

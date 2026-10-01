/**
 * 392. Is Subsequence
 *
 * Returns whether `s` is a subsequence of `t`: whether deleting some
 * characters of `t`, without reordering the rest, can leave `s`.
 *
 * Scans `t` once, matching the next unmatched character of `s` whenever it
 * appears.
 *
 * @see https://leetcode.com/problems/is-subsequence/
 * @difficulty Easy
 * @timeComplexity O(n) where n is the length of t
 * @spaceComplexity O(1)
 *
 * @example
 * isSubsequence("abc", "ahbgdc"); // true
 */
export const isSubsequence = (s: string, t: string): boolean => {
	let matched = 0;
	for (let i = 0; i < t.length && matched < s.length; i++)
		if (t[i] === s[matched]) matched++;
	return matched === s.length;
};

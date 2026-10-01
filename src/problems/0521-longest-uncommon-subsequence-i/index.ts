/**
 * 521. Longest Uncommon Subsequence I
 *
 * Returns the length of the longest string that is a subsequence of exactly
 * one of `a` and `b`, or -1 if there's none.
 *
 * If the strings differ, the longer one (either, when their lengths match)
 * can't be a subsequence of the other, so it's the answer. Equal strings
 * share every subsequence.
 *
 * @see https://leetcode.com/problems/longest-uncommon-subsequence-i/
 * @difficulty Easy
 * @timeComplexity O(n) for the comparison
 * @spaceComplexity O(1)
 *
 * @example
 * longestUncommonSubsequenceI("aba", "cdc"); // 3
 */
export const longestUncommonSubsequenceI = (a: string, b: string): number =>
	a === b ? -1 : Math.max(a.length, b.length);

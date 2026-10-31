/**
 * 3983. Subsequence After One Replacement
 *
 * Whether replacing at most one character of `s` can make it a
 * subsequence of `t`.
 *
 * Match prefixes of s greedily from the left of t and suffixes from the
 * right. Replacing s[i] works when the prefix before it and the suffix
 * after it leave at least one character of t between them.
 *
 * @see https://leetcode.com/problems/subsequence-after-one-replacement/
 * @difficulty Medium
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n)
 *
 * @example
 * subsequenceAfterOneReplacement("cat", "chat"); // true
 */
export const subsequenceAfterOneReplacement = (
	s: string,
	t: string,
): boolean => {
	const [n, m] = [s.length, t.length];
	// prefixEnd[i]: where t's scan stands after matching s[0..i), or Infinity.
	const prefixEnd = new Array<number>(n + 1).fill(Number.POSITIVE_INFINITY);
	prefixEnd[0] = 0;
	for (let i = 0, j = 0; i < n; i++) {
		while (j < m && t[j] !== s[i]) j++;
		if (j === m) break;
		prefixEnd[i + 1] = ++j;
	}
	// suffixStart[i]: the latest start in t from which s[i..] still matches, or -Infinity.
	const suffixStart = new Array<number>(n + 1).fill(Number.NEGATIVE_INFINITY);
	suffixStart[n] = m;
	for (let i = n - 1, j = m - 1; i >= 0; i--) {
		while (j >= 0 && t[j] !== s[i]) j--;
		if (j < 0) break;
		suffixStart[i] = j--;
	}
	if ((prefixEnd[n] ?? Number.POSITIVE_INFINITY) <= m) return true;
	for (let i = 0; i < n; i++)
		if (
			(prefixEnd[i] ?? Number.POSITIVE_INFINITY) + 1 <=
			(suffixStart[i + 1] ?? Number.NEGATIVE_INFINITY)
		)
			return true;
	return false;
};

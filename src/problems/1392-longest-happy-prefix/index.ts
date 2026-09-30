/**
 * 1392. Longest Happy Prefix
 *
 * Returns the longest proper prefix of `s` that is also a suffix, or `""`.
 *
 * The Knuth–Morris–Pratt failure function: its last entry is exactly the
 * length of that prefix.
 *
 * @see https://leetcode.com/problems/longest-happy-prefix/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestHappyPrefix("ababab"); // "abab"
 */
export const longestHappyPrefix = (s: string): string => {
	const failure = new Int32Array(s.length);
	for (let i = 1, k = 0; i < s.length; i++) {
		while (k > 0 && s[i] !== s[k]) k = failure[k - 1] ?? 0;
		if (s[i] === s[k]) k++;
		failure[i] = k;
	}
	return s.slice(0, failure[s.length - 1] ?? 0);
};

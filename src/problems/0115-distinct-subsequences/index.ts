/**
 * 115. Distinct Subsequences
 *
 * Returns how many distinct subsequences of `s` equal `t`: how many ways
 * there are to pick characters of `s`, in order, that spell `t`.
 *
 * Dynamic programming over prefixes of `t`: for each character of `s`, every
 * way of spelling `t`'s first `j - 1` characters extends to a way of
 * spelling its first `j` if the character matches `t[j - 1]`. Updating the
 * counts from the end of `t` backwards lets one array hold them all.
 *
 * @see https://leetcode.com/problems/distinct-subsequences/
 * @difficulty Hard
 * @timeComplexity O(m * n)
 * @spaceComplexity O(n) where n is the length of t
 *
 * @example
 * distinctSubsequences("rabbbit", "rabbit"); // 3
 */
export const distinctSubsequences = (s: string, t: string): number => {
	const ways = new Array<number>(t.length + 1).fill(0);
	ways[0] = 1;

	for (const char of s) {
		for (let j = t.length; j >= 1; j--) {
			if (t[j - 1] === char) ways[j] = (ways[j] ?? 0) + (ways[j - 1] ?? 0);
		}
	}

	return ways[t.length] ?? 0;
};

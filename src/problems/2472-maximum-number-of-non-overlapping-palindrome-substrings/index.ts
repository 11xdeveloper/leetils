/**
 * 2472. Maximum Number of Non-overlapping Palindrome Substrings
 *
 * Returns the most non-overlapping palindromic substrings of length at
 * least `k`.
 *
 * Any longer palindrome contains a centred one of length `k` or `k + 1`,
 * so only those lengths matter: `best[i]` for the first `i` characters
 * either skips a character or ends one of them.
 *
 * @see https://leetcode.com/problems/maximum-number-of-non-overlapping-palindrome-substrings/
 * @difficulty Hard
 * @timeComplexity O(n · k)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfNonOverlappingPalindromeSubstrings("abaccdbbd", 3); // 2
 */
export const maximumNumberOfNonOverlappingPalindromeSubstrings = (
	s: string,
	k: number,
): number => {
	const isPalindrome = (start: number, end: number): boolean => {
		for (let [i, j] = [start, end - 1]; i < j; i++, j--)
			if (s[i] !== s[j]) return false;
		return true;
	};
	const best = new Array<number>(s.length + 1).fill(0);
	for (let i = 1; i <= s.length; i++) {
		best[i] = best[i - 1] ?? 0;
		for (const length of [k, k + 1]) {
			if (i >= length && isPalindrome(i - length, i))
				best[i] = Math.max(best[i] ?? 0, (best[i - length] ?? 0) + 1);
		}
	}
	return best[s.length] ?? 0;
};

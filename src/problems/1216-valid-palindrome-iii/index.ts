/**
 * 1216. Valid Palindrome III
 *
 * Returns whether removing at most `k` characters from `s` can leave a
 * palindrome.
 *
 * The fewest removals leave the longest palindromic subsequence, found by
 * interval dynamic programming (keeping one row, filled from the right).
 *
 * @see https://leetcode.com/problems/valid-palindrome-iii/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * validPalindromeIII("abcdeca", 2); // true
 */
export const validPalindromeIII = (s: string, k: number): boolean => {
	const n = s.length;
	// longest[j] is the longest palindromic subsequence of s[i … j] for the current i.
	const longest = new Array<number>(n).fill(0);
	for (let i = n - 1; i >= 0; i--) {
		longest[i] = 1;
		let diagonal = 0;
		for (let j = i + 1; j < n; j++) {
			const below = longest[j] ?? 0;
			longest[j] =
				s[i] === s[j] ? diagonal + 2 : Math.max(below, longest[j - 1] ?? 0);
			diagonal = below;
		}
	}
	return n - (longest[n - 1] ?? 0) <= k;
};

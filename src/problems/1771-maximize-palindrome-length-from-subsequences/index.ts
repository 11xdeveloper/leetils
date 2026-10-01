/**
 * 1771. Maximize Palindrome Length From Subsequences
 *
 * Returns the longest palindrome formed by a non-empty subsequence of
 * `word1` followed by a non-empty subsequence of `word2`, or 0.
 *
 * Longest palindromic subsequence of the concatenation, but only counting
 * those whose outermost pair has one end in each word: whenever matching
 * ends straddle the boundary, they can be that outer pair.
 *
 * @see https://leetcode.com/problems/maximize-palindrome-length-from-subsequences/
 * @difficulty Hard
 * @timeComplexity O((m + n)^2)
 * @spaceComplexity O((m + n)^2)
 *
 * @example
 * maximizePalindromeLengthFromSubsequences("cacb", "cbba"); // 5
 */
export const maximizePalindromeLengthFromSubsequences = (
	word1: string,
	word2: string,
): number => {
	const s = word1 + word2;
	const n = s.length;
	// longest[i · n + j] is the longest palindromic subsequence of s[i … j].
	const longest = new Uint16Array(n * n);
	let best = 0;
	for (let i = n - 1; i >= 0; i--) {
		longest[i * n + i] = 1;
		for (let j = i + 1; j < n; j++) {
			if (s[i] === s[j]) {
				const inner = i + 1 <= j - 1 ? (longest[(i + 1) * n + j - 1] ?? 0) : 0;
				longest[i * n + j] = inner + 2;
				if (i < word1.length && j >= word1.length)
					best = Math.max(best, inner + 2);
			} else {
				longest[i * n + j] = Math.max(
					longest[(i + 1) * n + j] ?? 0,
					longest[i * n + j - 1] ?? 0,
				);
			}
		}
	}
	return best;
};

/**
 * 2697. Lexicographically Smallest Palindrome
 *
 * Returns the palindrome reachable from `s` with the fewest letter
 * changes, choosing the lexicographically smallest on ties.
 *
 * Each mirrored pair must match; set both to the smaller letter.
 *
 * @see https://leetcode.com/problems/lexicographically-smallest-palindrome/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * lexicographicallySmallestPalindrome("egcfe"); // "efcfe"
 */
export const lexicographicallySmallestPalindrome = (s: string): string =>
	[...s]
		.map((c, i) => {
			const mirror = s.charAt(s.length - 1 - i);
			return c < mirror ? c : mirror;
		})
		.join("");

/**
 * 409. Longest Palindrome
 *
 * Returns the length of the longest palindrome that can be built from the
 * letters of `s` (case-sensitive).
 *
 * Every pair of equal letters can go on both sides, and one leftover letter
 * can sit in the middle.
 *
 * @see https://leetcode.com/problems/longest-palindrome/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1), at most 52 letters
 *
 * @example
 * longestPalindrome("abccccdd"); // 7, like "dccaccd"
 */
export const longestPalindrome = (s: string): number => {
	const unpaired = new Set<string>();
	for (const char of s) {
		if (!unpaired.delete(char)) unpaired.add(char);
	}
	return s.length - unpaired.size + (unpaired.size > 0 ? 1 : 0);
};

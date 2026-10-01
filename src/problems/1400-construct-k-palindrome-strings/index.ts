/**
 * 1400. Construct K Palindrome Strings
 *
 * Returns whether all the characters of `s` can be arranged into exactly
 * `k` non-empty palindromes.
 *
 * Each palindrome can hold at most one letter with an odd count, so there
 * must be at most `k` odd letters, and there must be at least `k`
 * characters. Those two conditions are also enough.
 *
 * @see https://leetcode.com/problems/construct-k-palindrome-strings/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1), 26 letters
 *
 * @example
 * constructKPalindromeStrings("annabelle", 2); // true
 */
export const constructKPalindromeStrings = (s: string, k: number): boolean => {
	if (s.length < k) return false;
	let odd = 0;
	for (let i = 0; i < s.length; i++) odd ^= 1 << (s.charCodeAt(i) - 97);
	let oddLetters = 0;
	for (; odd !== 0; odd &= odd - 1) oddLetters++;
	return oddLetters <= k;
};

/**
 * 1332. Remove Palindromic Subsequences
 *
 * `s` is made of `a`s and `b`s. A step removes a palindromic subsequence.
 * Returns the fewest steps to empty `s`.
 *
 * All the `a`s form a palindrome, as do all the `b`s, so two steps always
 * suffice; one is enough exactly when `s` is itself a palindrome.
 *
 * @see https://leetcode.com/problems/remove-palindromic-subsequences/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * removePalindromicSubsequences("baabb"); // 2
 */
export const removePalindromicSubsequences = (s: string): number =>
	s === [...s].reverse().join("") ? 1 : 2;

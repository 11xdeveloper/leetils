/**
 * 3517. Smallest Palindromic Rearrangement I
 *
 * The lexicographically smallest palindrome that rearranges the palindrome
 * `s`.
 *
 * Sort one half, keep the middle letter, and mirror.
 *
 * @see https://leetcode.com/problems/smallest-palindromic-rearrangement-i/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * smallestPalindromicRearrangementI("babab"); // "abbba"
 */
export const smallestPalindromicRearrangementI = (s: string): string => {
	const half = [...s.slice(0, Math.floor(s.length / 2))].sort().join("");
	const middle = s.length % 2 === 1 ? s.charAt(Math.floor(s.length / 2)) : "";
	return half + middle + [...half].reverse().join("");
};

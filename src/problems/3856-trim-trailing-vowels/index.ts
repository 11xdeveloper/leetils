/**
 * 3856. Trim Trailing Vowels
 *
 * Removes the vowels at the end of `s`.
 *
 * @see https://leetcode.com/problems/trim-trailing-vowels/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * trimTrailingVowels("idea"); // "id"
 */
export const trimTrailingVowels = (s: string): string =>
	s.replace(/[aeiou]+$/, "");

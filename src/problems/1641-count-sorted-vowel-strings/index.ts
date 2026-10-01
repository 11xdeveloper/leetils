/**
 * 1641. Count Sorted Vowel Strings
 *
 * Counts the strings of length `n` over the vowels whose letters are in
 * sorted order.
 *
 * A sorted string is just a multiset of `n` vowels, of which there are
 * `C(n + 4, 4)` by stars and bars.
 *
 * @see https://leetcode.com/problems/count-sorted-vowel-strings/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * countSortedVowelStrings(2); // 15
 */
export const countSortedVowelStrings = (n: number): number =>
	((n + 1) * (n + 2) * (n + 3) * (n + 4)) / 24;

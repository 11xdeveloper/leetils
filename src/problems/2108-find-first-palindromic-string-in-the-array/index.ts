/**
 * 2108. Find First Palindromic String in the Array
 *
 * Returns the first palindrome in `words`, or `""`.
 *
 * Compare each word with its reverse.
 *
 * @see https://leetcode.com/problems/find-first-palindromic-string-in-the-array/
 * @difficulty Easy
 * @timeComplexity O(total length)
 * @spaceComplexity O(longest word)
 *
 * @example
 * findFirstPalindromicStringInTheArray(["abc", "car", "ada", "racecar", "cool"]); // "ada"
 */
export const findFirstPalindromicStringInTheArray = (
	words: readonly string[],
): string => words.find((word) => word === [...word].reverse().join("")) ?? "";

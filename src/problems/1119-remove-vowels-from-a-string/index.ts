/**
 * 1119. Remove Vowels from a String
 *
 * Returns `s` without its vowels (`a`, `e`, `i`, `o` and `u`).
 *
 * A regular expression replacement.
 *
 * @see https://leetcode.com/problems/remove-vowels-from-a-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n), for the result
 *
 * @example
 * removeVowelsFromAString("leetcodeisacommunityforcoders"); // "ltcdscmmntyfrcdrs"
 */
export const removeVowelsFromAString = (s: string): string =>
	s.replace(/[aeiou]/g, "");

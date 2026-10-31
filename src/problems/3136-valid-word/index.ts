/**
 * 3136. Valid Word
 *
 * Whether `word` has at least three characters, only English letters and
 * digits, and at least one vowel and one consonant.
 *
 * Check each rule with regular expressions.
 *
 * @see https://leetcode.com/problems/valid-word/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * validWord("234Adas"); // true
 */
export const validWord = (word: string): boolean =>
	word.length >= 3 &&
	/^[a-z0-9]+$/i.test(word) &&
	/[aeiou]/i.test(word) &&
	/[b-df-hj-np-tv-z]/i.test(word);

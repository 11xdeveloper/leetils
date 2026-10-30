/**
 * 2586. Count the Number of Vowel Strings in Range
 *
 * Returns how many of `words[left..right]` start and end with a vowel.
 *
 * Check each word in the range.
 *
 * @see https://leetcode.com/problems/count-the-number-of-vowel-strings-in-range/
 * @difficulty Easy
 * @timeComplexity O(right - left)
 * @spaceComplexity O(1)
 *
 * @example
 * countTheNumberOfVowelStringsInRange(["are", "amy", "u"], 0, 2); // 2
 */
export const countTheNumberOfVowelStringsInRange = (
	words: readonly string[],
	left: number,
	right: number,
): number => {
	const vowel = (c: string): boolean => "aeiou".includes(c);
	return words
		.slice(left, right + 1)
		.filter(
			(word) => vowel(word.charAt(0)) && vowel(word.charAt(word.length - 1)),
		).length;
};

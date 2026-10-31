/**
 * 3775. Reverse Words With Same Vowel Count
 *
 * In the space-separated words of `s`, reverse every word after the first
 * that has as many vowels as the first word.
 *
 * @see https://leetcode.com/problems/reverse-words-with-same-vowel-count/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * reverseWordsWithSameVowelCount("cat and mice"); // "cat dna mice"
 */
export const reverseWordsWithSameVowelCount = (s: string): string => {
	const vowels = (word: string) =>
		[...word].filter((c) => "aeiou".includes(c)).length;
	const words = s.split(" ");
	const target = vowels(words[0] ?? "");
	return words
		.map((word, i) =>
			i > 0 && vowels(word) === target ? [...word].reverse().join("") : word,
		)
		.join(" ");
};

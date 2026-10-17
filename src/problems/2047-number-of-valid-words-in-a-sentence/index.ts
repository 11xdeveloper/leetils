/**
 * 2047. Number of Valid Words in a Sentence
 *
 * Counts the space-separated tokens that are valid words: lowercase
 * letters with at most one hyphen between letters, and at most one
 * punctuation mark (`!`, `.` or `,`) at the end, but no digits.
 *
 * Match each token against a regular expression.
 *
 * @see https://leetcode.com/problems/number-of-valid-words-in-a-sentence/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfValidWordsInASentence("cat and  dog"); // 3
 */
export const numberOfValidWordsInASentence = (sentence: string): number =>
	sentence
		.split(" ")
		.filter(
			(token) => token !== "" && /^(?:[a-z]+(?:-[a-z]+)?)?[!.,]?$/.test(token),
		).length;

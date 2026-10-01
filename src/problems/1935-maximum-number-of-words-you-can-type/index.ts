/**
 * 1935. Maximum Number of Words You Can Type
 *
 * Counts the words of `text` that avoid every letter in `brokenLetters`.
 *
 * A set of broken letters and a check per word.
 *
 * @see https://leetcode.com/problems/maximum-number-of-words-you-can-type/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumNumberOfWordsYouCanType("hello world", "ad"); // 1
 */
export const maximumNumberOfWordsYouCanType = (
	text: string,
	brokenLetters: string,
): number => {
	const broken = new Set(brokenLetters);
	return text
		.split(" ")
		.filter((word) => ![...word].some((char) => broken.has(char))).length;
};

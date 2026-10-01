/**
 * 1451. Rearrange Words in a Sentence
 *
 * Reorders the words of `text` (which starts with a capital letter) by
 * length, keeping the original order for equal lengths, and capitalises
 * only the new first word.
 *
 * A stable sort by length, after lower-casing the first word.
 *
 * @see https://leetcode.com/problems/rearrange-words-in-a-sentence/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * rearrangeWordsInASentence("Keep calm and code on"); // "On and keep calm code"
 */
export const rearrangeWordsInASentence = (text: string): string => {
	const words = text
		.toLowerCase()
		.split(" ")
		.sort((a, b) => a.length - b.length)
		.join(" ");
	return (words[0] ?? "").toUpperCase() + words.slice(1);
};

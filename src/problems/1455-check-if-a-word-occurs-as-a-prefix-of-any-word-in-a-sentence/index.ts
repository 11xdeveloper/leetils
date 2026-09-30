/**
 * 1455. Check If a Word Occurs As a Prefix of Any Word in a Sentence
 *
 * Returns the 1-based position of the first word in `sentence` that starts
 * with `searchWord`, or -1.
 *
 * Splits the sentence and checks each word.
 *
 * @see https://leetcode.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfAWordOccursAsAPrefixOfAnyWordInASentence("i love eating burger", "burg"); // 4
 */
export const checkIfAWordOccursAsAPrefixOfAnyWordInASentence = (
	sentence: string,
	searchWord: string,
): number => {
	const index = sentence
		.split(" ")
		.findIndex((word) => word.startsWith(searchWord));
	return index === -1 ? -1 : index + 1;
};

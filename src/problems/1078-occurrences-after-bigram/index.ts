/**
 * 1078. Occurrences After Bigram
 *
 * Returns every word of `text` that directly follows an occurrence of the
 * words `first` then `second`, in order.
 *
 * Checks each triple of consecutive words.
 *
 * @see https://leetcode.com/problems/occurrences-after-bigram/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * occurrencesAfterBigram("alice is a good girl she is a good student", "a", "good"); // ["girl", "student"]
 */
export const occurrencesAfterBigram = (
	text: string,
	first: string,
	second: string,
): string[] => {
	const words = text.split(" ");
	return words
		.slice(2)
		.filter((_, i) => words[i] === first && words[i + 1] === second);
};

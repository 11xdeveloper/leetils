/**
 * 1859. Sorting the Sentence
 *
 * Each word of the shuffled sentence `s` ends with its 1-based position (at
 * most 9). Returns the original sentence.
 *
 * Place each word, minus its digit, at its position.
 *
 * @see https://leetcode.com/problems/sorting-the-sentence/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sortingTheSentence("is2 sentence4 This1 a3"); // "This is a sentence"
 */
export const sortingTheSentence = (s: string): string => {
	const words = s.split(" ");
	const ordered = new Array<string>(words.length);
	for (const word of words)
		ordered[Number(word.at(-1)) - 1] = word.slice(0, -1);
	return ordered.join(" ");
};

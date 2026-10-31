/**
 * 2490. Circular Sentence
 *
 * A sentence is circular when each word ends with the letter starting the
 * next, and the last word ends with the first word's first letter.
 *
 * @see https://leetcode.com/problems/circular-sentence/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * circularSentence("leetcode exercises sound delightful"); // true
 */
export const circularSentence = (sentence: string): boolean => {
	const words = sentence.split(" ");
	return words.every(
		(word, i) => word.at(-1) === (words[(i + 1) % words.length] ?? "")[0],
	);
};

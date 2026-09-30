/**
 * 1408. String Matching in an Array
 *
 * Returns the words (all distinct) that occur inside some other word.
 *
 * Checks each word against every longer word.
 *
 * @see https://leetcode.com/problems/string-matching-in-an-array/
 * @difficulty Easy
 * @timeComplexity O(n^2 · L^2) for words up to L long
 * @spaceComplexity O(n)
 *
 * @example
 * stringMatchingInAnArray(["mass", "as", "hero", "superhero"]); // ["as", "hero"]
 */
export const stringMatchingInAnArray = (words: readonly string[]): string[] =>
	words.filter((word) =>
		words.some((other) => other.length > word.length && other.includes(word)),
	);

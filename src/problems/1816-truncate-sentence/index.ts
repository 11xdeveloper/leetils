/**
 * 1816. Truncate Sentence
 *
 * Returns the first `k` words of the sentence `s`.
 *
 * Splits on spaces and rejoins.
 *
 * @see https://leetcode.com/problems/truncate-sentence/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * truncateSentence("Hello how are you Contestant", 4); // "Hello how are you"
 */
export const truncateSentence = (s: string, k: number): string =>
	s.split(" ").slice(0, k).join(" ");

/**
 * 2114. Maximum Number of Words Found in Sentences
 *
 * Returns the most words in any single-spaced sentence.
 *
 * A sentence has one more word than spaces.
 *
 * @see https://leetcode.com/problems/maximum-number-of-words-found-in-sentences/
 * @difficulty Easy
 * @timeComplexity O(total length)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumNumberOfWordsFoundInSentences(["please wait", "continue to fight", "continue to win"]); // 3
 */
export const maximumNumberOfWordsFoundInSentences = (
	sentences: readonly string[],
): number =>
	Math.max(...sentences.map((sentence) => sentence.split(" ").length));

/**
 * 884. Uncommon Words from Two Sentences
 *
 * A word is uncommon if it appears exactly once in one sentence and not at
 * all in the other. Returns the uncommon words, in the order they appear.
 *
 * That's the same as appearing exactly once across both sentences.
 *
 * @see https://leetcode.com/problems/uncommon-words-from-two-sentences/
 * @difficulty Easy
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * uncommonWordsFromTwoSentences("this apple is sweet", "this apple is sour"); // ["sweet", "sour"]
 */
export const uncommonWordsFromTwoSentences = (
	s1: string,
	s2: string,
): string[] => {
	const counts = new Map<string, number>();
	for (const word of `${s1} ${s2}`.split(" "))
		counts.set(word, (counts.get(word) ?? 0) + 1);
	return [...counts].filter(([, count]) => count === 1).map(([word]) => word);
};

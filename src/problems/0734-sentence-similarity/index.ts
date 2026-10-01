/**
 * 734. Sentence Similarity
 *
 * Two sentences (arrays of words) are similar if they have the same length
 * and each pair of words in the same position is equal or listed in
 * `similarPairs` (in either order). Similarity isn't transitive.
 *
 * Stores each pair both ways in a set, then checks the words position by
 * position.
 *
 * @see https://leetcode.com/problems/sentence-similarity/
 * @difficulty Easy
 * @timeComplexity O(n + p) for n words and p pairs
 * @spaceComplexity O(p)
 *
 * @example
 * sentenceSimilarity(["great", "acting"], ["fine", "drama"], [["great", "fine"], ["drama", "acting"]]); // true
 */
export const sentenceSimilarity = (
	sentence1: readonly string[],
	sentence2: readonly string[],
	similarPairs: readonly (readonly string[])[],
): boolean => {
	if (sentence1.length !== sentence2.length) return false;
	const similar = new Set<string>();
	for (const [a = "", b = ""] of similarPairs) {
		similar.add(`${a} ${b}`);
		similar.add(`${b} ${a}`);
	}
	return sentence1.every(
		(word, i) =>
			word === sentence2[i] || similar.has(`${word} ${sentence2[i]}`),
	);
};

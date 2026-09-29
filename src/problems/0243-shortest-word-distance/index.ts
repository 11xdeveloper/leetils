/**
 * 243. Shortest Word Distance
 *
 * Returns the smallest distance between the positions of two different
 * words, `word1` and `word2`, in `wordsDict`. Both words appear in it.
 *
 * Remembers the latest position of each word while scanning once; each time
 * one of them appears, its distance to the latest position of the other is
 * a candidate.
 *
 * @see https://leetcode.com/problems/shortest-word-distance/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * shortestWordDistance(["practice", "makes", "perfect", "coding", "makes"], "coding", "practice"); // 3
 */
export const shortestWordDistance = (
	wordsDict: readonly string[],
	word1: string,
	word2: string,
): number => {
	let last1 = Number.NEGATIVE_INFINITY;
	let last2 = Number.NEGATIVE_INFINITY;
	let shortest = Number.POSITIVE_INFINITY;

	for (const [i, word] of wordsDict.entries()) {
		if (word === word1) {
			last1 = i;
			shortest = Math.min(shortest, i - last2);
		} else if (word === word2) {
			last2 = i;
			shortest = Math.min(shortest, i - last1);
		}
	}

	return shortest;
};

/**
 * 245. Shortest Word Distance III
 *
 * Returns the smallest distance between the positions of `word1` and `word2`
 * in `wordsDict`. Unlike Shortest Word Distance, the two words may be the
 * same, in which case it's the distance between two of its occurrences.
 *
 * Scans once, remembering the latest position of each word. When the words
 * are the same, each occurrence is compared with the previous one instead.
 *
 * @see https://leetcode.com/problems/shortest-word-distance-iii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * shortestWordDistanceIII(["practice", "makes", "perfect", "coding", "makes"], "makes", "makes"); // 3
 */
export const shortestWordDistanceIII = (
	wordsDict: readonly string[],
	word1: string,
	word2: string,
): number => {
	let last1 = Number.NEGATIVE_INFINITY;
	let last2 = Number.NEGATIVE_INFINITY;
	let shortest = Number.POSITIVE_INFINITY;

	for (const [i, word] of wordsDict.entries()) {
		if (word1 === word2) {
			if (word !== word1) continue;
			shortest = Math.min(shortest, i - last1);
			last1 = i;
		} else if (word === word1) {
			last1 = i;
			shortest = Math.min(shortest, i - last2);
		} else if (word === word2) {
			last2 = i;
			shortest = Math.min(shortest, i - last1);
		}
	}

	return shortest;
};

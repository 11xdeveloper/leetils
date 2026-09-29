/**
 * 692. Top K Frequent Words
 *
 * Returns the `k` most frequent words, most frequent first, with ties in
 * lexicographic order.
 *
 * Counts the words, then sorts the distinct ones by count and then
 * alphabetically.
 *
 * @see https://leetcode.com/problems/top-k-frequent-words/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * topKFrequentWords(["i", "love", "leetcode", "i", "love", "coding"], 2); // ["i", "love"]
 */
export const topKFrequentWords = (
	words: readonly string[],
	k: number,
): string[] => {
	const counts = new Map<string, number>();
	for (const word of words) counts.set(word, (counts.get(word) ?? 0) + 1);
	return [...counts.keys()]
		.sort(
			(a, b) =>
				(counts.get(b) ?? 0) - (counts.get(a) ?? 0) ||
				(a < b ? -1 : a > b ? 1 : 0),
		)
		.slice(0, k);
};

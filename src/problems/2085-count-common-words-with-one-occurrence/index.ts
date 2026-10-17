/**
 * 2085. Count Common Words With One Occurrence
 *
 * Counts the strings that appear exactly once in each of the two arrays.
 *
 * Count both arrays and compare.
 *
 * @see https://leetcode.com/problems/count-common-words-with-one-occurrence/
 * @difficulty Easy
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * countCommonWordsWithOneOccurrence(["leetcode", "is", "amazing", "as", "is"], ["amazing", "leetcode", "is"]); // 2
 */
export const countCommonWordsWithOneOccurrence = (
	words1: readonly string[],
	words2: readonly string[],
): number => {
	const count = (words: readonly string[]): Map<string, number> => {
		const counts = new Map<string, number>();
		for (const word of words) counts.set(word, (counts.get(word) ?? 0) + 1);
		return counts;
	};
	const [counts1, counts2] = [count(words1), count(words2)];
	return [...counts1].filter(([word, c]) => c === 1 && counts2.get(word) === 1)
		.length;
};

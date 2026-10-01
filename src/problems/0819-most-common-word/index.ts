/**
 * 819. Most Common Word
 *
 * Returns the most frequent word in `paragraph` (ignoring case and
 * punctuation) that isn't in `banned`, in lowercase. The answer is unique.
 *
 * Splits the lowercased paragraph into runs of letters and counts those
 * not banned.
 *
 * @see https://leetcode.com/problems/most-common-word/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * mostCommonWord("Bob hit a ball, the hit BALL flew far after it was hit.", ["hit"]); // "ball"
 */
export const mostCommonWord = (
	paragraph: string,
	banned: readonly string[],
): string => {
	const excluded = new Set(banned);
	const counts = new Map<string, number>();
	let best = "";
	for (const word of paragraph.toLowerCase().match(/[a-z]+/g) ?? []) {
		if (excluded.has(word)) continue;
		const count = (counts.get(word) ?? 0) + 1;
		counts.set(word, count);
		if (count > (counts.get(best) ?? 0)) best = word;
	}
	return best;
};

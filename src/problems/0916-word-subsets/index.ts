/**
 * 916. Word Subsets
 *
 * A word is universal if every word in `words2` is a subset of it (each
 * letter appears at least as often). Returns the universal words of
 * `words1`, in order.
 *
 * Combines `words2` into one requirement: for each letter, the most times
 * any of them uses it. A word is universal when it meets that.
 *
 * @see https://leetcode.com/problems/word-subsets/
 * @difficulty Medium
 * @timeComplexity O(total length of both lists)
 * @spaceComplexity O(1), 26 counts, excluding the returned array
 *
 * @example
 * wordSubsets(["amazon", "apple", "facebook", "google", "leetcode"], ["e", "o"]); // ["facebook", "google", "leetcode"]
 */
export const wordSubsets = (
	words1: readonly string[],
	words2: readonly string[],
): string[] => {
	const counts = (word: string): number[] => {
		const result = new Array<number>(26).fill(0);
		for (let i = 0; i < word.length; i++) {
			const letter = word.charCodeAt(i) - 97;
			result[letter] = (result[letter] ?? 0) + 1;
		}
		return result;
	};
	const needed = new Array<number>(26).fill(0);
	for (const word of words2)
		for (const [letter, count] of counts(word).entries())
			needed[letter] = Math.max(needed[letter] ?? 0, count);
	return words1.filter((word) => {
		const have = counts(word);
		return needed.every((count, letter) => (have[letter] ?? 0) >= count);
	});
};

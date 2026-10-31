/**
 * 2506. Count Pairs Of Similar Strings
 *
 * Two words are similar if they use the same set of letters. Returns the
 * number of similar pairs.
 *
 * Reduce each word to a bitmask of its letters and count equal masks.
 *
 * @see https://leetcode.com/problems/count-pairs-of-similar-strings/
 * @difficulty Easy
 * @timeComplexity O(total length)
 * @spaceComplexity O(n)
 *
 * @example
 * countPairsOfSimilarStrings(["aba", "aabb", "abcd", "bac", "aabc"]); // 2
 */
export const countPairsOfSimilarStrings = (
	words: readonly string[],
): number => {
	const seen = new Map<number, number>();
	let pairs = 0;
	for (const word of words) {
		let mask = 0;
		for (let i = 0; i < word.length; i++)
			mask |= 1 << (word.charCodeAt(i) - 97);
		const count = seen.get(mask) ?? 0;
		pairs += count;
		seen.set(mask, count + 1);
	}
	return pairs;
};

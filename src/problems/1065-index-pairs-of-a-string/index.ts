/**
 * 1065. Index Pairs of a String
 *
 * Returns every `[i, j]` such that `text.slice(i, j + 1)` is one of
 * `words`, sorted by `i` and then `j`.
 *
 * Checks every occurrence of every word and sorts the pairs.
 *
 * @see https://leetcode.com/problems/index-pairs-of-a-string/
 * @difficulty Easy
 * @timeComplexity O(n · total length of the words)
 * @spaceComplexity O(output)
 *
 * @example
 * indexPairsOfAString("ababa", ["aba", "ab"]); // [[0, 1], [0, 2], [2, 3], [2, 4]]
 */
export const indexPairsOfAString = (
	text: string,
	words: readonly string[],
): number[][] => {
	const pairs: number[][] = [];
	for (const word of new Set(words)) {
		for (
			let at = text.indexOf(word);
			at !== -1;
			at = text.indexOf(word, at + 1)
		)
			pairs.push([at, at + word.length - 1]);
	}
	return pairs.sort(
		(a, b) => (a[0] ?? 0) - (b[0] ?? 0) || (a[1] ?? 0) - (b[1] ?? 0),
	);
};

/**
 * 720. Longest Word in Dictionary
 *
 * Returns the longest word in `words` that can be built one letter at a
 * time, adding to the end, with every intermediate word also in `words`.
 * Ties go to the lexicographically smallest; returns `""` if there's none.
 *
 * Goes through the words shortest first, marking a word buildable when
 * it's one letter long or its prefix without the last letter is buildable.
 *
 * @see https://leetcode.com/problems/longest-word-in-dictionary/
 * @difficulty Medium
 * @timeComplexity O(n log n · L) for the sort, with words of length up to L
 * @spaceComplexity O(n · L)
 *
 * @example
 * longestWordInDictionary(["w", "wo", "wor", "worl", "world"]); // "world"
 */
export const longestWordInDictionary = (words: readonly string[]): string => {
	const buildable = new Set<string>();
	let best = "";
	for (const word of words.toSorted((a, b) => a.length - b.length)) {
		if (word.length !== 1 && !buildable.has(word.slice(0, -1))) continue;
		buildable.add(word);
		if (
			word.length > best.length ||
			(word.length === best.length && word < best)
		)
			best = word;
	}
	return best;
};

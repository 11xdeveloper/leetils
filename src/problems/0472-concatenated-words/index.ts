/**
 * 472. Concatenated Words
 *
 * Returns the words in `words` (which has no duplicates) that are made by
 * concatenating at least two other words from the list, in their original
 * order.
 *
 * Word break on each word: `canEnd[i]` records whether its first `i`
 * letters split into listed words. A split covering the whole word with a
 * single piece doesn't count, since that piece is the word itself.
 *
 * @see https://leetcode.com/problems/concatenated-words/
 * @difficulty Hard
 * @timeComplexity O(n · L^3) where L is the longest word, for the substrings
 * @spaceComplexity O(n · L)
 *
 * @example
 * concatenatedWords(["cat", "cats", "catsdogcats", "dog", "dogcatsdog"]); // ["catsdogcats", "dogcatsdog"]
 */
export const concatenatedWords = (words: readonly string[]): string[] => {
	const dictionary = new Set(words);

	const isConcatenated = (word: string): boolean => {
		const canEnd = new Array<boolean>(word.length + 1).fill(false);
		canEnd[0] = true;
		for (let end = 1; end <= word.length; end++) {
			for (
				let start = end === word.length ? 1 : 0;
				start < end && !canEnd[end];
				start++
			) {
				canEnd[end] =
					(canEnd[start] ?? false) && dictionary.has(word.slice(start, end));
			}
		}
		return word.length > 0 && (canEnd[word.length] ?? false);
	};

	return words.filter(isConcatenated);
};

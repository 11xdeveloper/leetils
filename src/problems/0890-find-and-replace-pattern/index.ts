/**
 * 890. Find and Replace Pattern
 *
 * Returns the words that match `pattern` under some one-to-one mapping of
 * letters, in their original order.
 *
 * Maps each string to its shape (each letter replaced by the index of its
 * first occurrence); a word matches when its shape equals the pattern's.
 *
 * @see https://leetcode.com/problems/find-and-replace-pattern/
 * @difficulty Medium
 * @timeComplexity O(n · L)
 * @spaceComplexity O(L)
 *
 * @example
 * findAndReplacePattern(["abc", "deq", "mee", "aqq", "dkd", "ccc"], "abb"); // ["mee", "aqq"]
 */
export const findAndReplacePattern = (
	words: readonly string[],
	pattern: string,
): string[] => {
	const shape = (word: string): string =>
		[...word].map((char) => word.indexOf(char)).join();
	const target = shape(pattern);
	return words.filter((word) => shape(word) === target);
};

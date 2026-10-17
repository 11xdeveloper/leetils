/**
 * 2068. Check Whether Two Strings are Almost Equivalent
 *
 * Returns whether every letter's frequencies in `word1` and `word2` differ
 * by at most 3.
 *
 * Count the differences per letter.
 *
 * @see https://leetcode.com/problems/check-whether-two-strings-are-almost-equivalent/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkWhetherTwoStringsAreAlmostEquivalent("abcdeef", "abaaacc"); // true
 */
export const checkWhetherTwoStringsAreAlmostEquivalent = (
	word1: string,
	word2: string,
): boolean => {
	const difference = new Map<string, number>();
	for (const char of word1)
		difference.set(char, (difference.get(char) ?? 0) + 1);
	for (const char of word2)
		difference.set(char, (difference.get(char) ?? 0) - 1);
	return [...difference.values()].every((d) => Math.abs(d) <= 3);
};

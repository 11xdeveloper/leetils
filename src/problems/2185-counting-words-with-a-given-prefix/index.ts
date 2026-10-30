/**
 * 2185. Counting Words With a Given Prefix
 *
 * Counts the words starting with `pref`.
 *
 * @see https://leetcode.com/problems/counting-words-with-a-given-prefix/
 * @difficulty Easy
 * @timeComplexity O(n · p)
 * @spaceComplexity O(1)
 *
 * @example
 * countingWordsWithAGivenPrefix(["pay", "attention", "practice", "attend"], "at"); // 2
 */
export const countingWordsWithAGivenPrefix = (
	words: readonly string[],
	pref: string,
): number => words.filter((word) => word.startsWith(pref)).length;

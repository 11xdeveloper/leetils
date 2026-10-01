/**
 * 1897. Redistribute Characters to Make All Strings Equal
 *
 * Moving characters freely between `words`, returns whether they can all
 * become equal.
 *
 * Exactly when every letter's total count divides evenly among the words.
 *
 * @see https://leetcode.com/problems/redistribute-characters-to-make-all-strings-equal/
 * @difficulty Easy
 * @timeComplexity O(total length)
 * @spaceComplexity O(1)
 *
 * @example
 * redistributeCharactersToMakeAllStringsEqual(["abc", "aabc", "bc"]); // true
 */
export const redistributeCharactersToMakeAllStringsEqual = (
	words: readonly string[],
): boolean => {
	const counts = new Map<string, number>();
	for (const word of words)
		for (const char of word) counts.set(char, (counts.get(char) ?? 0) + 1);
	return [...counts.values()].every((count) => count % words.length === 0);
};

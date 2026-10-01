/**
 * 1941. Check if All Characters Have Equal Number of Occurrences
 *
 * Returns whether every character in `s` appears equally often.
 *
 * Counts characters and compares the distinct counts.
 *
 * @see https://leetcode.com/problems/check-if-all-characters-have-equal-number-of-occurrences/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfAllCharactersHaveEqualNumberOfOccurrences("abacbc"); // true
 */
export const checkIfAllCharactersHaveEqualNumberOfOccurrences = (
	s: string,
): boolean => {
	const counts = new Map<string, number>();
	for (const char of s) counts.set(char, (counts.get(char) ?? 0) + 1);
	return new Set(counts.values()).size === 1;
};

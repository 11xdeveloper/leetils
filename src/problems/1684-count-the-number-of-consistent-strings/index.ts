/**
 * 1684. Count the Number of Consistent Strings
 *
 * Counts the `words` made only of letters in `allowed`.
 *
 * Checks each word's letters against a set.
 *
 * @see https://leetcode.com/problems/count-the-number-of-consistent-strings/
 * @difficulty Easy
 * @timeComplexity O(total length)
 * @spaceComplexity O(1)
 *
 * @example
 * countTheNumberOfConsistentStrings("ab", ["ad", "bd", "aaab", "baa", "badab"]); // 2
 */
export const countTheNumberOfConsistentStrings = (
	allowed: string,
	words: readonly string[],
): number => {
	const letters = new Set(allowed);
	return words.filter((word) => [...word].every((char) => letters.has(char)))
		.length;
};

/**
 * 1662. Check If Two String Arrays are Equivalent
 *
 * Returns whether the strings of `word1` and of `word2`, each
 * concatenated, are equal.
 *
 * Joins both and compares.
 *
 * @see https://leetcode.com/problems/check-if-two-string-arrays-are-equivalent/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfTwoStringArraysAreEquivalent(["ab", "c"], ["a", "bc"]); // true
 */
export const checkIfTwoStringArraysAreEquivalent = (
	word1: readonly string[],
	word2: readonly string[],
): boolean => word1.join("") === word2.join("");

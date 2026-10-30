/**
 * 2828. Check if a String Is an Acronym of Words
 *
 * Returns whether `s` is formed by the first letter of each word, in
 * order.
 *
 * Build the acronym and compare.
 *
 * @see https://leetcode.com/problems/check-if-a-string-is-an-acronym-of-words/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfAStringIsAnAcronymOfWords(["alice", "bob", "charlie"], "abc"); // true
 */
export const checkIfAStringIsAnAcronymOfWords = (
	words: readonly string[],
	s: string,
): boolean => words.map((word) => word.charAt(0)).join("") === s;

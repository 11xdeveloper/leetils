/**
 * 151. Reverse Words in a String
 *
 * Returns the words of `s` in reverse order, separated by single spaces,
 * with no leading or trailing spaces. Words are runs of non-space
 * characters.
 *
 * Splits on runs of spaces, drops the empty strings from leading and
 * trailing spaces, and joins the words in reverse.
 *
 * @see https://leetcode.com/problems/reverse-words-in-a-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * reverseWordsInAString("  hello world  "); // "world hello"
 */
export const reverseWordsInAString = (s: string): string =>
	s
		.split(" ")
		.filter((word) => word !== "")
		.reverse()
		.join(" ");

/**
 * 557. Reverse Words in a String III
 *
 * Reverses the characters of each word in `s`, keeping the words in order
 * and the single spaces between them.
 *
 * Splits on spaces, reverses each word and joins them back.
 *
 * @see https://leetcode.com/problems/reverse-words-in-a-string-iii/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * reverseWordsInAStringIII("Let's take LeetCode contest"); // "s'teL ekat edoCteeL tsetnoc"
 */
export const reverseWordsInAStringIII = (s: string): string =>
	s
		.split(" ")
		.map((word) => [...word].reverse().join(""))
		.join(" ");

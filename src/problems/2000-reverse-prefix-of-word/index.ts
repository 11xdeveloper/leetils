/**
 * 2000. Reverse Prefix of Word
 *
 * Reverses `word` up to and including the first occurrence of `ch`, if
 * any.
 *
 * Find the index and reverse that slice.
 *
 * @see https://leetcode.com/problems/reverse-prefix-of-word/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * reversePrefixOfWord("abcdefd", "d"); // "dcbaefd"
 */
export const reversePrefixOfWord = (word: string, ch: string): string => {
	const end = word.indexOf(ch);
	return [...word.slice(0, end + 1)].reverse().join("") + word.slice(end + 1);
};

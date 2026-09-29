/**
 * 58. Length of Last Word
 *
 * Returns the length of the last word in `s`, where words are separated by
 * spaces. There is always at least one word.
 *
 * Scans backwards past any trailing spaces, then counts characters until the
 * next space or the start of the string.
 *
 * @see https://leetcode.com/problems/length-of-last-word/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * lengthOfLastWord("   fly me   to   the moon  "); // 4
 */
export const lengthOfLastWord = (s: string): number => {
	let end = s.length - 1;
	while (end >= 0 && s[end] === " ") end--;

	let start = end;
	while (start >= 0 && s[start] !== " ") start--;

	return end - start;
};

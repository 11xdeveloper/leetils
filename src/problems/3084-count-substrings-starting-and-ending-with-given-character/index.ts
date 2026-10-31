/**
 * 3084. Count Substrings Starting and Ending with Given Character
 *
 * How many substrings of `s` start and end with the letter `c`.
 *
 * With m copies of `c`, each pair of copies (or a copy with itself) bounds
 * one substring: m(m + 1) / 2.
 *
 * @see https://leetcode.com/problems/count-substrings-starting-and-ending-with-given-character/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countSubstringsStartingAndEndingWithGivenCharacter("abada", "a"); // 6
 */
export const countSubstringsStartingAndEndingWithGivenCharacter = (
	s: string,
	c: string,
): number => {
	let m = 0;
	for (const char of s) if (char === c) m++;
	return (m * (m + 1)) / 2;
};

/**
 * 389. Find the Difference
 *
 * `t` is `s` shuffled with one extra letter added somewhere. Returns that
 * letter.
 *
 * XOR-ing the character codes of both strings cancels every letter they
 * share, leaving the extra one.
 *
 * @see https://leetcode.com/problems/find-the-difference/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheDifference("abcd", "abcde"); // "e"
 */
export const findTheDifference = (s: string, t: string): string => {
	let code = 0;
	for (let i = 0; i < s.length; i++) code ^= s.charCodeAt(i);
	for (let i = 0; i < t.length; i++) code ^= t.charCodeAt(i);
	return String.fromCharCode(code);
};

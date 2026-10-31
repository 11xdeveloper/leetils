/**
 * 4030. Check ASCII Palindromic
 *
 * Whether writing each character of `s` as its 8-bit ASCII code, joined
 * together, gives a binary palindrome.
 *
 * @see https://leetcode.com/problems/check-ascii-palindromic/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkAsciiPalindromic("ff"); // true
 */
export const checkAsciiPalindromic = (s: string): boolean => {
	const bits = [...s]
		.map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
		.join("");
	return bits === [...bits].reverse().join("");
};

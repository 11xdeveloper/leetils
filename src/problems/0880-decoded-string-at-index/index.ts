/**
 * 880. Decoded String at Index
 *
 * An encoded string is decoded by writing its letters in order, and on
 * each digit `d` repeating everything written so far `d` times in total.
 * Returns the `k`th letter (from 1) of the decoded string, which can be far
 * too long to build.
 *
 * Computes the decoded length, then walks the encoding backwards. At a
 * digit, the tape is copies of a shorter prefix, so `k` reduces modulo that
 * prefix's length; at a letter, it's the answer if `k` points at the end.
 *
 * @see https://leetcode.com/problems/decoded-string-at-index/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * decodedStringAtIndex("leet2code3", 10); // "o"
 */
export const decodedStringAtIndex = (s: string, k: number): string => {
	let size = 0;
	for (const char of s) size = /\d/.test(char) ? size * Number(char) : size + 1;

	for (let i = s.length - 1; i >= 0; i--) {
		const char = s.charAt(i);
		k %= size;
		if (k === 0 && !/\d/.test(char)) return char;
		size = /\d/.test(char) ? size / Number(char) : size - 1;
	}
	return "";
};

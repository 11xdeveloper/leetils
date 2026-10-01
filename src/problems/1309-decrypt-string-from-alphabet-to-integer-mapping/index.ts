/**
 * 1309. Decrypt String from Alphabet to Integer Mapping
 *
 * Decodes `s`, where `a`–`i` are written `1`–`9` and `j`–`z` are written
 * `10#`–`26#`.
 *
 * A regular expression takes a two-digit code with its `#` when there is
 * one, and a single digit otherwise.
 *
 * @see https://leetcode.com/problems/decrypt-string-from-alphabet-to-integer-mapping/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * decryptStringFromAlphabetToIntegerMapping("10#11#12"); // "jkab"
 */
export const decryptStringFromAlphabetToIntegerMapping = (s: string): string =>
	s.replace(/(\d\d)#|\d/g, (match, pair: string | undefined) =>
		String.fromCharCode(96 + Number(pair ?? match)),
	);

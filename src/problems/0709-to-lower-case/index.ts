/**
 * 709. To Lower Case
 *
 * Returns `s` with every uppercase letter replaced by its lowercase letter.
 *
 * Shifts each character code from `A`–`Z` down to `a`–`z`, 32 places.
 *
 * @see https://leetcode.com/problems/to-lower-case/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * toLowerCase("Hello"); // "hello"
 */
export const toLowerCase = (s: string): string =>
	s.replace(/[A-Z]/g, (letter) =>
		String.fromCharCode(letter.charCodeAt(0) + 32),
	);

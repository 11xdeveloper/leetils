/**
 * 1844. Replace All Digits with Characters
 *
 * Replaces each digit at an odd index of `s` with the letter that many
 * places after the letter before it.
 *
 * One pass shifting character codes.
 *
 * @see https://leetcode.com/problems/replace-all-digits-with-characters/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * replaceAllDigitsWithCharacters("a1c1e1"); // "abcdef"
 */
export const replaceAllDigitsWithCharacters = (s: string): string =>
	Array.from(s, (char, i) =>
		i % 2 === 1
			? String.fromCharCode(s.charCodeAt(i - 1) + Number(char))
			: char,
	).join("");

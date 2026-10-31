/**
 * 3602. Hexadecimal and Hexatrigesimal Conversion
 *
 * Returns n² in base 16 followed by n³ in base 36, using uppercase digits.
 *
 * @see https://leetcode.com/problems/hexadecimal-and-hexatrigesimal-conversion/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * hexadecimalAndHexatrigesimalConversion(13); // "A91P1"
 */
export const hexadecimalAndHexatrigesimalConversion = (n: number): string =>
	((n * n).toString(16) + (n * n * n).toString(36)).toUpperCase();

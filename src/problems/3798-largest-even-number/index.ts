/**
 * 3798. Largest Even Number
 *
 * `s` holds only the digits 1 and 2. Delete digits to leave the largest
 * even number possible, returned as a string ("" if there's none).
 *
 * An even result ends in 2, and keeping every digit before the last 2
 * makes it longest and so largest.
 *
 * @see https://leetcode.com/problems/largest-even-number/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * largestEvenNumber("221"); // "22"
 */
export const largestEvenNumber = (s: string): string =>
	s.slice(0, s.lastIndexOf("2") + 1);

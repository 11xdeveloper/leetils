/**
 * 1556. Thousand Separator
 *
 * Writes `n` with a dot between every group of three digits.
 *
 * Inserts dots into the digit string, counting groups from the right.
 *
 * @see https://leetcode.com/problems/thousand-separator/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * thousandSeparator(1234); // "1.234"
 */
export const thousandSeparator = (n: number): string =>
	String(n).replace(/\B(?=(\d{3})+$)/g, ".");

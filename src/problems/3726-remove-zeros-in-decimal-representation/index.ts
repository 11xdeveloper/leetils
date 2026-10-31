/**
 * 3726. Remove Zeros in Decimal Representation
 *
 * Returns `n` with every 0 digit deleted.
 *
 * @see https://leetcode.com/problems/remove-zeros-in-decimal-representation/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * removeZerosInDecimalRepresentation(1020030); // 123
 */
export const removeZerosInDecimalRepresentation = (n: number): number =>
	Number(String(n).replaceAll("0", ""));

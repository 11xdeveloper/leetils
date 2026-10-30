/**
 * 2710. Remove Trailing Zeros From a String
 *
 * Returns the decimal string `num` without its trailing zeros.
 *
 * Trim them off the end.
 *
 * @see https://leetcode.com/problems/remove-trailing-zeros-from-a-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * removeTrailingZerosFromAString("51230100"); // "512301"
 */
export const removeTrailingZerosFromAString = (num: string): string =>
	num.replace(/0+$/, "");

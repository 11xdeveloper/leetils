/**
 * 2980. Check if Bitwise OR Has Trailing Zeros
 *
 * Returns whether two or more elements have a bitwise OR ending in a 0
 * bit.
 *
 * The OR is even exactly when every chosen element is, so two even
 * numbers are needed and enough.
 *
 * @see https://leetcode.com/problems/check-if-bitwise-or-has-trailing-zeros/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfBitwiseOrHasTrailingZeros([2, 4, 8, 16]); // true
 */
export const checkIfBitwiseOrHasTrailingZeros = (
	nums: readonly number[],
): boolean => nums.filter((num) => num % 2 === 0).length >= 2;

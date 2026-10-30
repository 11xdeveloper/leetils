/**
 * 2729. Check if The Number is Fascinating
 *
 * A three-digit `n` is fascinating if writing `n`, `2n` and `3n` one
 * after another uses each digit 1 to 9 exactly once and no 0s. Returns
 * whether `n` is fascinating.
 *
 * Build the string and sort its digits.
 *
 * @see https://leetcode.com/problems/check-if-the-number-is-fascinating/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfTheNumberIsFascinating(192); // true
 */
export const checkIfTheNumberIsFascinating = (n: number): boolean =>
	[...`${n}${2 * n}${3 * n}`].sort().join("") === "123456789";

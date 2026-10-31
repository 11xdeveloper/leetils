/**
 * 2450. Number of Distinct Binary Strings After Applying Operations
 *
 * An operation flips every bit of a length-`k` substring of `s`. Counts
 * the distinct strings reachable, modulo 10^9 + 7.
 *
 * Each of the `n - k + 1` windows is flipped or not, and different choices
 * give different strings: `2^(n - k + 1)`.
 *
 * @see https://leetcode.com/problems/number-of-distinct-binary-strings-after-applying-operations/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfDistinctBinaryStringsAfterApplyingOperations("1001", 3); // 4
 */
export const numberOfDistinctBinaryStringsAfterApplyingOperations = (
	s: string,
	k: number,
): number => {
	let count = 1;
	for (let i = 0; i <= s.length - k; i++) count = (count * 2) % 1_000_000_007;
	return count;
};

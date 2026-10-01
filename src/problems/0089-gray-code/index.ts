/**
 * 89. Gray Code
 *
 * Returns an n-bit Gray code sequence: every integer from 0 to 2^n - 1 once,
 * starting at 0, where each pair of adjacent values (including the last and
 * first) differs in exactly one bit.
 *
 * The standard reflected binary Gray code maps `i` to `i ^ (i >> 1)`.
 *
 * @see https://leetcode.com/problems/gray-code/
 * @difficulty Medium
 * @timeComplexity O(2^n)
 * @spaceComplexity O(2^n) for the returned sequence
 *
 * @example
 * grayCode(2); // [0, 1, 3, 2]
 */
export const grayCode = (n: number): number[] =>
	Array.from({ length: 2 ** n }, (_, i) => i ^ (i >> 1));

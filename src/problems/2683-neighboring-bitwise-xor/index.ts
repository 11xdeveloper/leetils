/**
 * 2683. Neighboring Bitwise XOR
 *
 * `derived[i]` is `original[i] ^ original[i + 1]`, wrapping around at the
 * end. Returns whether some binary `original` produces `derived`.
 *
 * Every original bit appears in exactly two terms, so the XOR of
 * `derived` must be 0; and when it is, any starting bit works.
 *
 * @see https://leetcode.com/problems/neighboring-bitwise-xor/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * neighboringBitwiseXor([1, 1, 0]); // true
 */
export const neighboringBitwiseXor = (derived: readonly number[]): boolean =>
	derived.reduce((xor, bit) => xor ^ bit, 0) === 0;

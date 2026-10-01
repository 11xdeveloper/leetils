/**
 * 1256. Encode Number
 *
 * Returns the encoding of `num` from LeetCode's table, which lists every
 * binary string shortest first and then in order: `""`, `"0"`, `"1"`,
 * `"00"`, `"01"`, …
 *
 * The strings of length `k` start at `2^k − 1`, so `num + 1` in binary is a
 * 1 followed by exactly the encoding.
 *
 * @see https://leetcode.com/problems/encode-number/
 * @difficulty Medium
 * @timeComplexity O(log num)
 * @spaceComplexity O(log num)
 *
 * @example
 * encodeNumber(23); // "1000"
 */
export const encodeNumber = (num: number): string =>
	(num + 1).toString(2).slice(1);

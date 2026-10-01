/**
 * 1680. Concatenation of Consecutive Binary Numbers
 *
 * Returns the value of the binary representations of `1 … n` written one
 * after another, modulo 10^9 + 7.
 *
 * Each step shifts the result left by the bit length of `i` (which grows
 * at each power of two) and adds `i`. The product stays below 2^53.
 *
 * @see https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * concatenationOfConsecutiveBinaryNumbers(3); // 27
 */
export const concatenationOfConsecutiveBinaryNumbers = (n: number): number => {
	let [result, bits] = [0, 0];
	for (let i = 1; i <= n; i++) {
		if ((i & (i - 1)) === 0) bits++;
		result = (result * 2 ** bits + i) % 1_000_000_007;
	}
	return result;
};

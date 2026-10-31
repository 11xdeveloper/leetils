/**
 * 3125. Maximum Number That Makes Result of Bitwise AND Zero
 *
 * The largest x such that the AND of every number from x to `n` is 0.
 *
 * The range must cross a power of two below `n`'s top bit to clear it, so x
 * is one less than that power.
 *
 * @see https://leetcode.com/problems/maximum-number-that-makes-result-of-bitwise-and-zero/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumNumberThatMakesResultOfBitwiseAndZero(7); // 3
 */
export const maximumNumberThatMakesResultOfBitwiseAndZero = (
	n: number,
): number => {
	let power = 1;
	while (power * 2 <= n) power *= 2;
	return power - 1;
};

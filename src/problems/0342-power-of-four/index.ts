/**
 * 342. Power of Four
 *
 * Returns whether `n` is a power of four, without loops or recursion.
 *
 * A power of four is a power of two (exactly one bit set) whose bit is at an
 * even position, which the mask 0x55555555 (binary 0101…) picks out.
 *
 * @see https://leetcode.com/problems/power-of-four/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * powerOfFour(16); // true
 * powerOfFour(8); // false
 */
export const powerOfFour = (n: number): boolean =>
	n > 0 && (n & (n - 1)) === 0 && (n & 0x55555555) !== 0;

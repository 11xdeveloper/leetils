/**
 * 326. Power of Three
 *
 * Returns whether `n` is a power of three, without loops or recursion.
 *
 * 3 is prime, so the powers of three that fit in 32 bits are exactly the
 * positive divisors of the largest one, 3^19 = 1162261467.
 *
 * @see https://leetcode.com/problems/power-of-three/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * powerOfThree(27); // true
 * powerOfThree(45); // false
 */
export const powerOfThree = (n: number): boolean =>
	n > 0 && 1162261467 % n === 0;

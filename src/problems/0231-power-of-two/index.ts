/**
 * 231. Power of Two
 *
 * Returns whether `n` is a power of two.
 *
 * A power of two has exactly one bit set, and `n & (n - 1)` clears the lowest
 * set bit, so it is 0 exactly for powers of two (and for 0, which is ruled
 * out separately).
 *
 * @see https://leetcode.com/problems/power-of-two/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * powerOfTwo(16); // true
 * powerOfTwo(3); // false
 */
export const powerOfTwo = (n: number): boolean => n > 0 && (n & (n - 1)) === 0;

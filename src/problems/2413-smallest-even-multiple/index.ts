/**
 * 2413. Smallest Even Multiple
 *
 * Returns the smallest positive multiple of both 2 and `n`.
 *
 * @see https://leetcode.com/problems/smallest-even-multiple/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * smallestEvenMultiple(5); // 10
 */
export const smallestEvenMultiple = (n: number): number => (n % 2 ? 2 * n : n);

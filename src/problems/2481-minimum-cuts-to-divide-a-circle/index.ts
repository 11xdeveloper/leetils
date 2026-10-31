/**
 * 2481. Minimum Cuts to Divide a Circle
 *
 * Returns the fewest straight cuts (through the centre, or from the edge
 * to the centre) to divide a circle into `n` equal slices.
 *
 * Diameters make two slices each when `n` is even; otherwise each slice
 * needs its own radius. One slice needs no cuts.
 *
 * @see https://leetcode.com/problems/minimum-cuts-to-divide-a-circle/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumCutsToDivideACircle(4); // 2
 */
export const minimumCutsToDivideACircle = (n: number): number =>
	n === 1 ? 0 : n % 2 ? n : n / 2;

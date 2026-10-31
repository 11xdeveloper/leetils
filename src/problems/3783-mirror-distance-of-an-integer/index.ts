/**
 * 3783. Mirror Distance of an Integer
 *
 * The absolute difference between `n` and its digits reversed.
 *
 * @see https://leetcode.com/problems/mirror-distance-of-an-integer/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * mirrorDistanceOfAnInteger(25); // 27
 */
export const mirrorDistanceOfAnInteger = (n: number): number =>
	Math.abs(n - Number([...String(n)].reverse().join("")));

/**
 * 908. Smallest Range I
 *
 * Each element of `nums` may be changed once by any amount from `-k` to
 * `k`. Returns the smallest possible difference between the largest and
 * smallest elements afterwards.
 *
 * The largest can come down by `k` and the smallest go up by `k`, closing
 * the gap by `2k`, but not below 0.
 *
 * @see https://leetcode.com/problems/smallest-range-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * smallestRangeI([0, 10], 2); // 6
 */
export const smallestRangeI = (nums: readonly number[], k: number): number =>
	Math.max(0, Math.max(...nums) - Math.min(...nums) - 2 * k);

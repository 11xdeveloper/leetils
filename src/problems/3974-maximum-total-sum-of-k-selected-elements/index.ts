/**
 * 3974. Maximum Total Sum of K Selected Elements
 *
 * Process `k` chosen elements in any order; the j-th (from 0) adds itself
 * or itself times `mul - j`, whichever is larger. Returns the best total.
 *
 * Use the k largest elements, the largest with the biggest multiplier.
 *
 * @see https://leetcode.com/problems/maximum-total-sum-of-k-selected-elements/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumTotalSumOfKSelectedElements([3, 7, 5, 2], 2, 4); // 43
 */
export const maximumTotalSumOfKSelectedElements = (
	nums: readonly number[],
	k: number,
	mul: number,
): number =>
	[...nums]
		.sort((a, b) => b - a)
		.slice(0, k)
		.reduce((total, x, j) => total + x * Math.max(1, mul - j), 0);

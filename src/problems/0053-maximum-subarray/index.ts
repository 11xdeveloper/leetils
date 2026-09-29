/**
 * 53. Maximum Subarray
 *
 * Returns the largest sum of any non-empty contiguous subarray of `nums`.
 *
 * Kadane's algorithm: the best subarray ending at each index either extends
 * the best one ending just before it, or starts fresh if that sum is
 * negative.
 *
 * @see https://leetcode.com/problems/maximum-subarray/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]); // 6, from [4, -1, 2, 1]
 */
export const maximumSubarray = (nums: readonly number[]): number => {
	let best = Number.NEGATIVE_INFINITY;
	let endingHere = 0;

	for (const num of nums) {
		endingHere = Math.max(num, endingHere + num);
		best = Math.max(best, endingHere);
	}

	return best;
};

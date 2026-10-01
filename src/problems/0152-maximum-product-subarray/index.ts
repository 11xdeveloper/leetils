/**
 * 152. Maximum Product Subarray
 *
 * Returns the largest product of any non-empty contiguous subarray of
 * `nums`.
 *
 * Tracks both the largest and smallest product of subarrays ending at each
 * index, because multiplying by a negative number turns the smallest
 * product into the largest.
 *
 * @see https://leetcode.com/problems/maximum-product-subarray/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumProductSubarray([2, 3, -2, 4]); // 6, from [2, 3]
 */
export const maximumProductSubarray = (nums: readonly number[]): number => {
	let best = Number.NEGATIVE_INFINITY;
	let largest = 1;
	let smallest = 1;

	for (const num of nums) {
		const candidates = [num, largest * num, smallest * num];
		largest = Math.max(...candidates);
		smallest = Math.min(...candidates);
		best = Math.max(best, largest);
	}

	// `|| 0` turns a -0 product into 0.
	return best || 0;
};

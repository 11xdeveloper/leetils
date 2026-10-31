/**
 * 2918. Minimum Equal Sum of Two Arrays After Replacing Zeros
 *
 * Every 0 in both arrays must be replaced with a positive integer.
 * Returns the smallest equal sum the arrays can reach, or -1.
 *
 * Each array's smallest sum counts its zeros as 1s. The answer is the
 * larger of the two, unless the smaller array has no zeros to grow.
 *
 * @see https://leetcode.com/problems/minimum-equal-sum-of-two-arrays-after-replacing-zeros/
 * @difficulty Medium
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumEqualSumOfTwoArraysAfterReplacingZeros([3, 2, 0, 1, 0], [6, 5, 0]); // 12
 */
export const minimumEqualSumOfTwoArraysAfterReplacingZeros = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const smallest = (nums: readonly number[]): [sum: number, zeros: number] => {
		let sum = 0;
		let zeros = 0;
		for (const num of nums) {
			if (num === 0) zeros++;
			sum += Math.max(num, 1);
		}
		return [sum, zeros];
	};
	const [sum1, zeros1] = smallest(nums1);
	const [sum2, zeros2] = smallest(nums2);
	if ((sum1 < sum2 && zeros1 === 0) || (sum2 < sum1 && zeros2 === 0)) return -1;
	return Math.max(sum1, sum2);
};

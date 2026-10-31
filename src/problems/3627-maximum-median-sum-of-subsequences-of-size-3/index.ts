/**
 * 3627. Maximum Median Sum of Subsequences of Size 3
 *
 * Split `nums` (a multiple of 3 long) into groups of three, maximising the
 * sum of the groups' medians.
 *
 * Sorted, each group pairs the smallest remaining number with the two
 * largest, so the medians are every other number from the second largest
 * down.
 *
 * @see https://leetcode.com/problems/maximum-median-sum-of-subsequences-of-size-3/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumMedianSumOfSubsequencesOfSize3([2, 1, 3, 2, 1, 3]); // 5
 */
export const maximumMedianSumOfSubsequencesOfSize3 = (
	nums: readonly number[],
): number => {
	const sorted = [...nums].sort((a, b) => a - b);
	const n = sorted.length;
	let sum = 0;
	for (let i = 0; i < n / 3; i++) sum += sorted[n - 2 - 2 * i] ?? 0;
	return sum;
};

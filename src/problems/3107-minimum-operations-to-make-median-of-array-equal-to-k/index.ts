/**
 * 3107. Minimum Operations to Make Median of Array Equal to K
 *
 * The fewest ±1 steps on elements of `nums` to make its median `k`, where
 * the median of an even-length array is the larger middle element.
 *
 * Sort. The median position must become `k`, everything before it must be
 * at most `k`, and everything after at least `k`; move only what breaks
 * that.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-median-of-array-equal-to-k/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumOperationsToMakeMedianOfArrayEqualToK([2, 5, 6, 8, 5], 4); // 2
 */
export const minimumOperationsToMakeMedianOfArrayEqualToK = (
	nums: readonly number[],
	k: number,
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	const mid = Math.floor(sorted.length / 2);
	let operations = 0;
	sorted.forEach((num, i) => {
		if (i <= mid && num > k) operations += num - k;
		if (i >= mid && num < k) operations += k - num;
	});
	return operations;
};

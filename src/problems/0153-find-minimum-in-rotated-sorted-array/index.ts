/**
 * 153. Find Minimum in Rotated Sorted Array
 *
 * Returns the smallest value in `nums`, which holds distinct values in
 * ascending order, rotated so that it may start part-way through.
 *
 * Binary search against the last value: if the middle value is larger, the
 * rotation point (the minimum) is to its right; otherwise it's the middle or
 * to its left.
 *
 * @see https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * findMinimumInRotatedSortedArray([3, 4, 5, 1, 2]); // 1
 */
export const findMinimumInRotatedSortedArray = (
	nums: readonly number[],
): number => {
	let low = 0;
	let high = nums.length - 1;

	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if ((nums[mid] ?? 0) > (nums[high] ?? 0)) low = mid + 1;
		else high = mid;
	}

	return nums[low] ?? 0;
};

/**
 * 154. Find Minimum in Rotated Sorted Array II
 *
 * Returns the smallest value in `nums`, which is sorted in non-decreasing
 * order, may contain duplicates, and may be rotated so that it starts
 * part-way through.
 *
 * Binary search against the last value, as in Find Minimum in Rotated Sorted
 * Array. When the middle equals the last value there's no telling which side
 * the minimum is on, but the last value can safely be dropped, since the
 * middle holds a copy of it. That makes the worst case O(n), for example
 * when almost every value is the same.
 *
 * @see https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/
 * @difficulty Hard
 * @timeComplexity O(log n) on average, O(n) in the worst case
 * @spaceComplexity O(1)
 *
 * @example
 * findMinimumInRotatedSortedArrayII([2, 2, 2, 0, 1]); // 0
 */
export const findMinimumInRotatedSortedArrayII = (
	nums: readonly number[],
): number => {
	let low = 0;
	let high = nums.length - 1;

	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		const value = nums[mid] ?? 0;
		const last = nums[high] ?? 0;
		if (value > last) low = mid + 1;
		else if (value < last) high = mid;
		else high--;
	}

	return nums[low] ?? 0;
};

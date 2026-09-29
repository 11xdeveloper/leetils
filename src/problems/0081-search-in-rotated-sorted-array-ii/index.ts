/**
 * 81. Search in Rotated Sorted Array II
 *
 * Returns whether `target` is in `nums`, which is sorted in non-decreasing
 * order, may contain duplicates, and may be rotated so that it starts
 * part-way through.
 *
 * Binary search, as in Search in Rotated Sorted Array: one half of the range
 * is always sorted, and the target is either within its values or not. When
 * the ends and middle are all equal, there's no telling which half is sorted,
 * so both ends shrink by one. That makes the worst case O(n), for example
 * when almost every value is the same.
 *
 * @see https://leetcode.com/problems/search-in-rotated-sorted-array-ii/
 * @difficulty Medium
 * @timeComplexity O(log n) on average, O(n) in the worst case
 * @spaceComplexity O(1)
 *
 * @example
 * searchInRotatedSortedArrayII([2, 5, 6, 0, 0, 1, 2], 0); // true
 */
export const searchInRotatedSortedArrayII = (
	nums: readonly number[],
	target: number,
): boolean => {
	let low = 0;
	let high = nums.length - 1;

	while (low <= high) {
		const mid = Math.floor((low + high) / 2);
		const value = nums[mid] ?? 0;
		if (value === target) return true;

		const lowValue = nums[low] ?? 0;
		const highValue = nums[high] ?? 0;

		if (lowValue === value && value === highValue) {
			low++;
			high--;
		} else if (lowValue <= value) {
			if (lowValue <= target && target < value) high = mid - 1;
			else low = mid + 1;
		} else if (value < target && target <= highValue) {
			low = mid + 1;
		} else {
			high = mid - 1;
		}
	}

	return false;
};

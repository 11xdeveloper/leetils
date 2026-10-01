/**
 * 33. Search in Rotated Sorted Array
 *
 * Returns the index of `target` in `nums`, or -1 if it isn't there. `nums`
 * holds distinct values in ascending order, possibly rotated so that it
 * starts part-way through, like `[4, 5, 6, 7, 0, 1, 2]`.
 *
 * Binary search. At least one half of the current range is always in
 * ascending order; if the target falls within that half's values, search
 * there, otherwise search the other half.
 *
 * @see https://leetcode.com/problems/search-in-rotated-sorted-array/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * searchInRotatedSortedArray([4, 5, 6, 7, 0, 1, 2], 0); // 4
 * searchInRotatedSortedArray([4, 5, 6, 7, 0, 1, 2], 3); // -1
 */
export const searchInRotatedSortedArray = (
	nums: readonly number[],
	target: number,
): number => {
	let low = 0;
	let high = nums.length - 1;

	while (low <= high) {
		const mid = Math.floor((low + high) / 2);
		const value = nums[mid] ?? 0;
		if (value === target) return mid;

		const lowValue = nums[low] ?? 0;
		const highValue = nums[high] ?? 0;

		if (lowValue <= value) {
			// low..mid is in ascending order.
			if (lowValue <= target && target < value) high = mid - 1;
			else low = mid + 1;
		} else if (value < target && target <= highValue) {
			// mid..high is in ascending order and holds the target's value.
			low = mid + 1;
		} else {
			high = mid - 1;
		}
	}

	return -1;
};

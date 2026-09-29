import { searchInsertPosition } from "../0035-search-insert-position";

/**
 * 34. Find First and Last Position of Element in Sorted Array
 *
 * Returns the first and last index of `target` in `nums`, which is sorted in
 * non-decreasing order, or `[-1, -1]` if it isn't there.
 *
 * Two binary searches, using the solution to Search Insert Position: the
 * first index whose value isn't less than `target`, and the first whose value
 * isn't less than `target + 1`. Values are integers, so the last occurrence
 * of `target` is just before the second.
 *
 * @see https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * findFirstAndLastPositionOfElementInSortedArray([5, 7, 7, 8, 8, 10], 8); // [3, 4]
 * findFirstAndLastPositionOfElementInSortedArray([5, 7, 7, 8, 8, 10], 6); // [-1, -1]
 */
export const findFirstAndLastPositionOfElementInSortedArray = (
	nums: readonly number[],
	target: number,
): number[] => {
	const first = searchInsertPosition(nums, target);
	if (nums[first] !== target) return [-1, -1];

	return [first, searchInsertPosition(nums, target + 1) - 1];
};

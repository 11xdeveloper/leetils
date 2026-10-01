/**
 * 26. Remove Duplicates from Sorted Array
 *
 * Removes repeated values from a sorted array in place, as the problem
 * requires, and returns how many unique values there are, `k`. The first `k`
 * elements of `nums` are then the unique values in their original order; the
 * rest are left as they were.
 *
 * Keeps a write index that only advances when a value differs from the last
 * one written.
 *
 * @see https://leetcode.com/problems/remove-duplicates-from-sorted-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
 * removeDuplicatesFromSortedArray(nums); // 5, and nums starts [0, 1, 2, 3, 4]
 */
export const removeDuplicatesFromSortedArray = (nums: number[]): number => {
	let k = 0;

	for (const num of nums) {
		if (k === 0 || num !== nums[k - 1]) {
			nums[k] = num;
			k++;
		}
	}

	return k;
};

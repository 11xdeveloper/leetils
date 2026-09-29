/**
 * 80. Remove Duplicates from Sorted Array II
 *
 * Removes values from a sorted array in place, as the problem requires, so
 * each value appears at most twice, and returns how many elements are left,
 * `k`. The first `k` elements of `nums` are then the kept values in order.
 *
 * Keeps a write index. A value is kept unless it equals the value two places
 * before the write index, which would make a third copy.
 *
 * @see https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * const nums = [1, 1, 1, 2, 2, 3];
 * removeDuplicatesFromSortedArrayII(nums); // 5, and nums starts [1, 1, 2, 2, 3]
 */
export const removeDuplicatesFromSortedArrayII = (nums: number[]): number => {
	let k = 0;

	for (const num of nums) {
		if (k < 2 || num !== nums[k - 2]) {
			nums[k] = num;
			k++;
		}
	}

	return k;
};

/**
 * 88. Merge Sorted Array
 *
 * Merges the sorted array `nums2` into `nums1` in place, as the problem
 * requires. `nums1` holds `m` sorted values followed by `n` placeholder
 * zeros, making room for the `n` values of `nums2`.
 *
 * Fills `nums1` from the back with the larger of the two last unmerged
 * values, so nothing in `nums1` is overwritten before it has been moved.
 *
 * @see https://leetcode.com/problems/merge-sorted-array/
 * @difficulty Easy
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1)
 *
 * @example
 * const nums1 = [1, 2, 3, 0, 0, 0];
 * mergeSortedArray(nums1, 3, [2, 5, 6], 3); // nums1 is now [1, 2, 2, 3, 5, 6]
 */
export const mergeSortedArray = (
	nums1: number[],
	m: number,
	nums2: readonly number[],
	n: number,
): void => {
	let i = m - 1;
	let j = n - 1;

	for (let write = m + n - 1; j >= 0; write--) {
		if (i >= 0 && (nums1[i] ?? 0) > (nums2[j] ?? 0)) {
			nums1[write] = nums1[i] ?? 0;
			i--;
		} else {
			nums1[write] = nums2[j] ?? 0;
			j--;
		}
	}
};

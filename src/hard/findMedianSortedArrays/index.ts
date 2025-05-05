/**
 * Given two sorted arrays nums1 and nums2 of size m and n respectively,
 * return the median of the two sorted arrays.
 * The overall run time complexity should be O(log (m+n)).
 *
 * Note: This implementation currently runs in O((m+n)log(m+n)) due to using sort.
 * A more optimal solution would use binary search to achieve O(log(m+n)).
 *
 * @param nums1 - First sorted array
 * @param nums2 - Second sorted array
 * @returns The median of the two sorted arrays
 *
 * @example
 * Input: nums1 = [1,3], nums2 = [2]
 * Output: 2.00000
 * Explanation: Merged array = [1,2,3] and median is 2
 *
 * @example
 * Input: nums1 = [1,2], nums2 = [3,4]
 * Output: 2.50000
 * Explanation: Merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5
 *
 * @example
 * Input: nums1 = [], nums2 = [1]
 * Output: 1.00000
 * Explanation: Merged array = [1] and median is 1
 *
 * @timeComplexity O((m+n)log(m+n)) - Due to sorting the merged array
 * @spaceComplexity O(m+n) - To store the merged array
 */
export const findMedianSortedArrays = (
	nums1: number[],
	nums2: number[],
): number => {
	const sorted = nums1.concat(nums2).sort((x, y) => y - x);

	const middle = Math.floor(sorted.length / 2);
	return sorted.length % 2 === 0
		? sorted.slice(middle - 1, middle + 1).reduce((x, y) => x + y, 0) / 2
		: sorted[middle]!;
};

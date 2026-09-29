/**
 * 349. Intersection of Two Arrays
 *
 * Returns the distinct values that appear in both `nums1` and `nums2`, in
 * any order.
 *
 * Puts `nums1` in a set and keeps the values of `nums2` that are in it,
 * removing each from the set once taken so it isn't repeated.
 *
 * @see https://leetcode.com/problems/intersection-of-two-arrays/
 * @difficulty Easy
 * @timeComplexity O(m + n)
 * @spaceComplexity O(m)
 *
 * @example
 * intersectionOfTwoArrays([4, 9, 5], [9, 4, 9, 8, 4]); // [9, 4]
 */
export const intersectionOfTwoArrays = (
	nums1: readonly number[],
	nums2: readonly number[],
): number[] => {
	const remaining = new Set(nums1);
	return nums2.filter((num) => remaining.delete(num));
};

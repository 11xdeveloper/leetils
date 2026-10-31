/**
 * 2540. Minimum Common Value
 *
 * Returns the smallest integer in both sorted arrays, or -1 if there is
 * none.
 *
 * Walk both arrays with two pointers.
 *
 * @see https://leetcode.com/problems/minimum-common-value/
 * @difficulty Easy
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumCommonValue([1, 2, 3, 6], [2, 3, 4, 5]); // 2
 */
export const minimumCommonValue = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	let i = 0;
	let j = 0;
	while (i < nums1.length && j < nums2.length) {
		const a = nums1[i] ?? 0;
		const b = nums2[j] ?? 0;
		if (a === b) return a;
		if (a < b) i++;
		else j++;
	}
	return -1;
};

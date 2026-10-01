/**
 * 1874. Minimize Product Sum of Two Arrays
 *
 * Rearranging `nums1`, returns the smallest `Σ nums1[i] · nums2[i]`.
 *
 * By the rearrangement inequality, pair the largest of one with the
 * smallest of the other.
 *
 * @see https://leetcode.com/problems/minimize-product-sum-of-two-arrays/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimizeProductSumOfTwoArrays([5, 3, 4, 2], [4, 2, 2, 5]); // 40
 */
export const minimizeProductSumOfTwoArrays = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const ascending = nums1.toSorted((a, b) => a - b);
	const descending = nums2.toSorted((a, b) => b - a);
	return ascending.reduce(
		(sum, value, i) => sum + value * (descending[i] ?? 0),
		0,
	);
};

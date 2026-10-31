/**
 * 2215. Find the Difference of Two Arrays
 *
 * Returns the distinct values of `nums1` missing from `nums2`, and those
 * of `nums2` missing from `nums1`, each in order of first appearance.
 *
 * Compare against each other's set.
 *
 * @see https://leetcode.com/problems/find-the-difference-of-two-arrays/
 * @difficulty Easy
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * findTheDifferenceOfTwoArrays([1, 2, 3], [2, 4, 6]); // [[1, 3], [4, 6]]
 */
export const findTheDifferenceOfTwoArrays = (
	nums1: readonly number[],
	nums2: readonly number[],
): number[][] => {
	const [set1, set2] = [new Set(nums1), new Set(nums2)];
	return [
		[...set1].filter((num) => !set2.has(num)),
		[...set2].filter((num) => !set1.has(num)),
	];
};

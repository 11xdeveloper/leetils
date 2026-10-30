/**
 * 2956. Find Common Elements Between Two Arrays
 *
 * Returns how many elements of `nums1` appear in `nums2`, and how many of
 * `nums2` appear in `nums1`.
 *
 * Look each up in a set of the other.
 *
 * @see https://leetcode.com/problems/find-common-elements-between-two-arrays/
 * @difficulty Easy
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * findCommonElementsBetweenTwoArrays([4, 3, 2, 3, 1], [2, 2, 5, 2, 3, 6]); // [3, 4]
 */
export const findCommonElementsBetweenTwoArrays = (
	nums1: readonly number[],
	nums2: readonly number[],
): number[] => {
	const in1 = new Set(nums1);
	const in2 = new Set(nums2);
	return [
		nums1.filter((x) => in2.has(x)).length,
		nums2.filter((x) => in1.has(x)).length,
	];
};

/**
 * 350. Intersection of Two Arrays II
 *
 * Returns the values that appear in both `nums1` and `nums2`, each as many
 * times as it appears in both (the smaller of its two counts), in any
 * order.
 *
 * Counts the values of `nums1`, then takes each value of `nums2` while its
 * count lasts.
 *
 * @see https://leetcode.com/problems/intersection-of-two-arrays-ii/
 * @difficulty Easy
 * @timeComplexity O(m + n)
 * @spaceComplexity O(m)
 *
 * @example
 * intersectionOfTwoArraysII([1, 2, 2, 1], [2, 2]); // [2, 2]
 */
export const intersectionOfTwoArraysII = (
	nums1: readonly number[],
	nums2: readonly number[],
): number[] => {
	const counts = new Map<number, number>();
	for (const num of nums1) counts.set(num, (counts.get(num) ?? 0) + 1);

	return nums2.filter((num) => {
		const count = counts.get(num) ?? 0;
		if (count === 0) return false;
		counts.set(num, count - 1);
		return true;
	});
};

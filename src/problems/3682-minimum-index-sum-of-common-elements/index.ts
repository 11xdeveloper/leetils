/**
 * 3682. Minimum Index Sum of Common Elements
 *
 * The smallest i + j with `nums1[i]` equal to `nums2[j]`, or -1.
 *
 * Only each value's first index in `nums2` matters.
 *
 * @see https://leetcode.com/problems/minimum-index-sum-of-common-elements/
 * @difficulty Medium
 * @timeComplexity O(n + m)
 * @spaceComplexity O(m)
 *
 * @example
 * minimumIndexSumOfCommonElements([3, 2, 1], [1, 3, 1]); // 1
 */
export const minimumIndexSumOfCommonElements = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const first = new Map<number, number>();
	nums2.forEach((num, j) => {
		if (!first.has(num)) first.set(num, j);
	});
	let best = -1;
	nums1.forEach((num, i) => {
		const j = first.get(num);
		if (j !== undefined && (best < 0 || i + j < best)) best = i + j;
	});
	return best;
};

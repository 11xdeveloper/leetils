/**
 * 454. 4Sum II
 *
 * Counts the tuples `(i, j, k, l)` with
 * `nums1[i] + nums2[j] + nums3[k] + nums4[l] === 0`.
 *
 * Meet in the middle: counts every sum of a pair from the first two arrays,
 * then for every pair from the last two looks up how many pairs cancel it.
 *
 * @see https://leetcode.com/problems/4sum-ii/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * fourSumII([1, 2], [-2, -1], [-1, 2], [0, 2]); // 2
 */
export const fourSumII = (
	nums1: readonly number[],
	nums2: readonly number[],
	nums3: readonly number[],
	nums4: readonly number[],
): number => {
	const pairSums = new Map<number, number>();
	for (const a of nums1) {
		for (const b of nums2) pairSums.set(a + b, (pairSums.get(a + b) ?? 0) + 1);
	}

	let tuples = 0;
	for (const c of nums3) {
		for (const d of nums4) tuples += pairSums.get(-(c + d)) ?? 0;
	}
	return tuples;
};

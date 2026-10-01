/**
 * 1983. Widest Pair of Indices With Equal Range Sum
 *
 * Returns the widest range `[i, j]` where the binary arrays `nums1` and
 * `nums2` have equal sums, or 0.
 *
 * The range sums match when the running difference of prefix sums is the
 * same at both ends; remember where each difference first appears.
 *
 * @see https://leetcode.com/problems/widest-pair-of-indices-with-equal-range-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * widestPairOfIndicesWithEqualRangeSum([1, 1, 0, 1], [0, 1, 1, 0]); // 3
 */
export const widestPairOfIndicesWithEqualRangeSum = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const first = new Map([[0, -1]]);
	let [difference, widest] = [0, 0];
	for (const [i, value] of nums1.entries()) {
		difference += value - (nums2[i] ?? 0);
		const start = first.get(difference);
		if (start === undefined) first.set(difference, i);
		else widest = Math.max(widest, i - start);
	}
	return widest;
};

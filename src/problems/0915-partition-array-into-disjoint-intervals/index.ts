/**
 * 915. Partition Array into Disjoint Intervals
 *
 * Splits `nums` into a non-empty left part and right part with every left
 * element at most every right element, the left part as short as possible,
 * and returns its length. A valid split exists.
 *
 * The split after `i` works when the prefix maximum is at most the suffix
 * minimum; suffix minimums are precomputed.
 *
 * @see https://leetcode.com/problems/partition-array-into-disjoint-intervals/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * partitionArrayIntoDisjointIntervals([5, 0, 3, 8, 6]); // 3
 */
export const partitionArrayIntoDisjointIntervals = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const suffixMin = new Array<number>(n + 1).fill(Number.POSITIVE_INFINITY);
	for (let i = n - 1; i >= 0; i--)
		suffixMin[i] = Math.min(suffixMin[i + 1] ?? 0, nums[i] ?? 0);
	let prefixMax = Number.NEGATIVE_INFINITY;
	for (let i = 0; i < n - 1; i++) {
		prefixMax = Math.max(prefixMax, nums[i] ?? 0);
		if (prefixMax <= (suffixMin[i + 1] ?? 0)) return i + 1;
	}
	return n - 1;
};

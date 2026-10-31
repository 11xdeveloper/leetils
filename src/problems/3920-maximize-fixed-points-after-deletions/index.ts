/**
 * 3920. Maximize Fixed Points After Deletions
 *
 * Delete any elements of `nums`; position i is fixed if it then holds i.
 * Returns the most fixed points possible.
 *
 * Element `nums[i]` = v can only land at position v if v ≤ i. Two such
 * elements can both be fixed when their values increase and the gap in
 * indices covers the gap in values, i.e. i - v doesn't decrease. Sort by
 * i - v (then v) and take the longest strictly increasing run of values.
 *
 * @see https://leetcode.com/problems/maximize-fixed-points-after-deletions/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeFixedPointsAfterDeletions([1, 0, 1, 2]); // 3
 */
export const maximizeFixedPointsAfterDeletions = (
	nums: readonly number[],
): number => {
	const candidates = nums
		.map((v, i) => [i - v, v] as const)
		.filter(([slack]) => slack >= 0)
		.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
	const tails: number[] = [];
	for (const [, v] of candidates) {
		let [lo, hi] = [0, tails.length];
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((tails[mid] ?? 0) < v) lo = mid + 1;
			else hi = mid;
		}
		tails[lo] = v;
	}
	return tails.length;
};

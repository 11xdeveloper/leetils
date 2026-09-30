/**
 * 910. Smallest Range II
 *
 * Each element of `nums` must change by exactly `+k` or `-k`. Returns the
 * smallest possible difference between the largest and smallest results.
 *
 * After sorting, some prefix goes up and the rest goes down. For each split
 * point, the new extremes come from the ends of the two groups.
 *
 * @see https://leetcode.com/problems/smallest-range-ii/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * smallestRangeII([1, 3, 6], 3); // 3
 */
export const smallestRangeII = (nums: readonly number[], k: number): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	const first = sorted[0] ?? 0;
	const last = sorted.at(-1) ?? 0;
	let best = last - first;
	for (let i = 0; i + 1 < sorted.length; i++) {
		const high = Math.max((sorted[i] ?? 0) + k, last - k);
		const low = Math.min(first + k, (sorted[i + 1] ?? 0) - k);
		best = Math.min(best, high - low);
	}
	return best;
};

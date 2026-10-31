/**
 * 3801. Minimum Cost to Merge Sorted Lists
 *
 * Repeatedly merge two of the sorted `lists`, at a cost of their combined
 * length plus the gap between their medians (the left middle element),
 * until one list remains. Returns the least total cost.
 *
 * Any set of lists merges into the same sorted list, with a median fixed
 * by the set, so dynamic programming over subsets of at most 12 lists:
 * the best cost for a set splits it into two parts every way.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-merge-sorted-lists/
 * @difficulty Hard
 * @timeComplexity O(3ⁿ + 2ⁿ · L), for L elements in all
 * @spaceComplexity O(2ⁿ · L)
 *
 * @example
 * minimumCostToMergeSortedLists([[1, 3, 5], [2, 4], [6, 7, 8]]); // 18
 */
export const minimumCostToMergeSortedLists = (
	lists: readonly (readonly number[])[],
): number => {
	const n = lists.length;
	const full = (1 << n) - 1;
	const merged: Int32Array[] = [new Int32Array(0)];
	const median = new Float64Array(1 << n);
	for (let mask = 1; mask <= full; mask++) {
		const low = 31 - Math.clz32(mask & -mask);
		const [a, b] = [
			merged[mask & (mask - 1)] ?? new Int32Array(0),
			lists[low] ?? [],
		];
		const out = new Int32Array(a.length + b.length);
		let [i, j, k] = [0, 0, 0];
		while (i < a.length || j < b.length)
			out[k++] =
				j >= b.length || (i < a.length && (a[i] ?? 0) <= (b[j] ?? 0))
					? (a[i++] ?? 0)
					: (b[j++] ?? 0);
		merged[mask] = out;
		median[mask] = out[(out.length - 1) >> 1] ?? 0;
	}
	const cost = new Float64Array(1 << n).fill(Number.POSITIVE_INFINITY);
	for (let i = 0; i < n; i++) cost[1 << i] = 0;
	for (let mask = 1; mask <= full; mask++) {
		if ((mask & (mask - 1)) === 0) continue;
		const size = merged[mask]?.length ?? 0;
		// Each split once: the part holding the lowest list is `part`.
		const low = mask & -mask;
		for (let part = (mask - 1) & mask; part > 0; part = (part - 1) & mask) {
			if (!(part & low)) continue;
			const other = mask ^ part;
			const value =
				(cost[part] ?? 0) +
				(cost[other] ?? 0) +
				size +
				Math.abs((median[part] ?? 0) - (median[other] ?? 0));
			if (value < (cost[mask] ?? 0)) cost[mask] = value;
		}
	}
	return cost[full] ?? 0;
};

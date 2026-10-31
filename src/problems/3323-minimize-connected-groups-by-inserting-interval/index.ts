/**
 * 3323. Minimize Connected Groups by Inserting Interval
 *
 * Add one interval of length at most `k`, then merge overlapping or
 * touching intervals into connected groups. Returns the fewest groups
 * possible.
 *
 * Merge the given intervals first. The new interval can join a run of
 * consecutive groups when the gap from the first one's end to the last
 * one's start is at most `k`, so find the longest such run with two
 * pointers.
 *
 * @see https://leetcode.com/problems/minimize-connected-groups-by-inserting-interval/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimizeConnectedGroupsByInsertingInterval([[1, 3], [5, 6], [8, 10]], 3); // 2
 */
export const minimizeConnectedGroupsByInsertingInterval = (
	intervals: readonly (readonly number[])[],
	k: number,
): number => {
	const groups: [number, number][] = [];
	for (const [start = 0, end = 0] of intervals.toSorted(
		(a, b) => (a[0] ?? 0) - (b[0] ?? 0),
	)) {
		const last = groups.at(-1);
		if (last && start <= last[1]) last[1] = Math.max(last[1], end);
		else groups.push([start, end]);
	}
	let joined = 0;
	for (let i = 0, j = 0; i < groups.length; i++) {
		j = Math.max(j, i);
		while (
			j + 1 < groups.length &&
			(groups[j + 1]?.[0] ?? 0) - (groups[i]?.[1] ?? 0) <= k
		)
			j++;
		joined = Math.max(joined, j - i);
	}
	return groups.length - joined;
};

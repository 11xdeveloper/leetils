/**
 * 3975. Filter Occupied Intervals
 *
 * Merge the occupied intervals that overlap or touch, then cut out every
 * point from `freeStart` to `freeEnd`. Returns what's left, sorted.
 *
 * @see https://leetcode.com/problems/filter-occupied-intervals/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * filterOccupiedIntervals([[1, 5], [2, 3]], 3, 8); // [[1, 2]]
 */
export const filterOccupiedIntervals = (
	occupiedIntervals: readonly (readonly number[])[],
	freeStart: number,
	freeEnd: number,
): number[][] => {
	const merged: number[][] = [];
	for (const [start = 0, end = 0] of [...occupiedIntervals].sort(
		(a, b) => (a[0] ?? 0) - (b[0] ?? 0),
	)) {
		const last = merged.at(-1);
		if (last && start <= (last[1] ?? 0) + 1)
			last[1] = Math.max(last[1] ?? 0, end);
		else merged.push([start, end]);
	}
	return merged.flatMap(([start = 0, end = 0]) => {
		const pieces: number[][] = [];
		if (start < freeStart) pieces.push([start, Math.min(end, freeStart - 1)]);
		if (end > freeEnd) pieces.push([Math.max(start, freeEnd + 1), end]);
		return pieces;
	});
};

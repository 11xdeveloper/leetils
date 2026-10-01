/**
 * 56. Merge Intervals
 *
 * Merges all overlapping `[start, end]` intervals and returns the result,
 * sorted by start. Intervals that only touch, like `[1, 4]` and `[4, 5]`,
 * count as overlapping.
 *
 * Sorts the intervals by start, then extends the last merged interval while
 * the next one starts before it ends.
 *
 * @see https://leetcode.com/problems/merge-intervals/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]); // [[1, 6], [8, 10], [15, 18]]
 */
export const mergeIntervals = (
	intervals: readonly (readonly number[])[],
): number[][] => {
	const sorted = intervals.toSorted((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
	const merged: [number, number][] = [];

	for (const [start = 0, end = 0] of sorted) {
		const last = merged.at(-1);
		if (last && start <= last[1]) last[1] = Math.max(last[1], end);
		else merged.push([start, end]);
	}

	return merged;
};

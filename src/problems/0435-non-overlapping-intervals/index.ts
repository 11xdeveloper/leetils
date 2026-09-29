/**
 * 435. Non-overlapping Intervals
 *
 * Returns the fewest intervals to remove from `intervals` so the rest don't
 * overlap. Intervals that only touch, like `[1, 2]` and `[2, 3]`, don't
 * overlap.
 *
 * The classic interval-scheduling greedy: sorted by end, keep each interval
 * that starts no earlier than the last kept one ends. Ending as early as
 * possible leaves the most room, so this keeps the most intervals, and
 * everything else is removed.
 *
 * @see https://leetcode.com/problems/non-overlapping-intervals/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * nonOverlappingIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]); // 1
 */
export const nonOverlappingIntervals = (
	intervals: readonly (readonly number[])[],
): number => {
	const sorted = intervals.toSorted((a, b) => (a[1] ?? 0) - (b[1] ?? 0));
	let kept = 0;
	let lastEnd = Number.NEGATIVE_INFINITY;

	for (const [start = 0, end = 0] of sorted) {
		if (start >= lastEnd) {
			kept++;
			lastEnd = end;
		}
	}

	return intervals.length - kept;
};

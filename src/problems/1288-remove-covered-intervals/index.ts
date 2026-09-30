/**
 * 1288. Remove Covered Intervals
 *
 * Returns how many of the distinct `intervals` aren't covered by another
 * (`[c, d)` covers `[a, b)` when `c ≤ a` and `b ≤ d`).
 *
 * Sorts by start, and by end descending for equal starts, so any interval
 * that could cover one comes before it. Then an interval is covered exactly
 * when an earlier one reaches at least as far.
 *
 * @see https://leetcode.com/problems/remove-covered-intervals/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * removeCoveredIntervals([[1, 4], [3, 6], [2, 8]]); // 2
 */
export const removeCoveredIntervals = (
	intervals: readonly (readonly number[])[],
): number => {
	const sorted = intervals.toSorted(
		(a, b) => (a[0] ?? 0) - (b[0] ?? 0) || (b[1] ?? 0) - (a[1] ?? 0),
	);
	let [remaining, reach] = [0, -Infinity];
	for (const [, end = 0] of sorted) {
		if (end <= reach) continue;
		remaining++;
		reach = end;
	}
	return remaining;
};

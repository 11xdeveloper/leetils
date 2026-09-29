/**
 * 436. Find Right Interval
 *
 * For each interval `[start, end]` (all starts distinct), returns the index
 * of the interval with the smallest start that is at least its end, or -1
 * if there isn't one.
 *
 * Sorts the start points with their original indices, then binary searches
 * for each interval's end.
 *
 * @see https://leetcode.com/problems/find-right-interval/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findRightInterval([[3, 4], [2, 3], [1, 2]]); // [-1, 0, 1]
 */
export const findRightInterval = (
	intervals: readonly (readonly number[])[],
): number[] => {
	const starts = intervals
		.map(([start = 0], i) => [start, i] as const)
		.toSorted((a, b) => a[0] - b[0]);

	return intervals.map(([, end = 0]) => {
		let low = 0;
		let high = starts.length;
		while (low < high) {
			const mid = Math.floor((low + high) / 2);
			if ((starts[mid]?.[0] ?? 0) < end) low = mid + 1;
			else high = mid;
		}
		return starts[low]?.[1] ?? -1;
	});
};

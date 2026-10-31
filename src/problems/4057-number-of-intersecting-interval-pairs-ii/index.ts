/**
 * 4057. Number of Intersecting Interval Pairs II
 *
 * Counts the pairs of closed intervals sharing at least one point.
 *
 * All pairs minus the disjoint ones: interval a is disjoint from those
 * starting after it ends, found by binary search over sorted starts.
 *
 * @see https://leetcode.com/problems/number-of-intersecting-interval-pairs-ii/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfIntersectingIntervalPairsII([[1, 2], [2, 3], [3, 4]]); // 2
 */
export const numberOfIntersectingIntervalPairsII = (
	intervals: readonly (readonly number[])[],
): number => {
	const n = intervals.length;
	const starts = intervals.map(([start = 0]) => start).sort((a, b) => a - b);
	let disjoint = 0;
	for (const [, end = 0] of intervals) {
		let [lo, hi] = [0, n];
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((starts[mid] ?? 0) <= end) lo = mid + 1;
			else hi = mid;
		}
		disjoint += n - lo;
	}
	return (n * (n - 1)) / 2 - disjoint;
};

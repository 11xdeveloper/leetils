/**
 * 2054. Two Best Non-Overlapping Events
 *
 * Each event `[start, end, value]` runs over inclusive times. Returns the
 * largest total value of at most two events, where the second starts
 * after the first ends.
 *
 * Sort by start and keep suffix maximums of value. For each event, binary
 * search for the first event starting after it ends.
 *
 * @see https://leetcode.com/problems/two-best-non-overlapping-events/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * twoBestNonOverlappingEvents([[1, 3, 2], [4, 5, 2], [2, 4, 3]]); // 4
 */
export const twoBestNonOverlappingEvents = (
	events: readonly (readonly number[])[],
): number => {
	const sorted = events.toSorted((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
	const n = sorted.length;
	const bestFrom = new Array<number>(n + 1).fill(0);
	for (let i = n - 1; i >= 0; i--)
		bestFrom[i] = Math.max(bestFrom[i + 1] ?? 0, sorted[i]?.[2] ?? 0);

	let best = 0;
	for (const [, end = 0, value = 0] of sorted) {
		let [lo, hi] = [0, n];
		while (lo < hi) {
			const mid = (lo + hi) >> 1;
			if ((sorted[mid]?.[0] ?? 0) > end) hi = mid;
			else lo = mid + 1;
		}
		best = Math.max(best, value + (bestFrom[lo] ?? 0));
	}
	return best;
};

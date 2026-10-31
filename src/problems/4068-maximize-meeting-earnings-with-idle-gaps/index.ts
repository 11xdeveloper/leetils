/**
 * 4068. Maximize Meeting Earnings with Idle Gaps
 *
 * Pick non-overlapping meetings, earning their revenues plus one unit per
 * unit of idle time between consecutive picks. Returns the best total.
 *
 * The idle gaps add up to the last start minus the first end, minus the
 * middle meetings' lengths. So a meeting is worth r - end first, r -
 * length in the middle and r + start last. Sort by end and chain them,
 * keeping a running best of open chains that end before each start.
 *
 * @see https://leetcode.com/problems/maximize-meeting-earnings-with-idle-gaps/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeMeetingEarningsWithIdleGaps([[1, 2, 2], [4, 5, 2], [7, 9, 3]]); // 11
 */
export const maximizeMeetingEarningsWithIdleGaps = (
	meetings: readonly (readonly number[])[],
): number => {
	const sorted = [...meetings].sort((a, b) => (a[1] ?? 0) - (b[1] ?? 0));
	const ends: number[] = [];
	// openBest[i]: best open chain among the first i + 1 meetings by end.
	const openBest: number[] = [];
	let best = Number.NEGATIVE_INFINITY;
	for (const [start = 0, end = 0, revenue = 0] of sorted) {
		let [lo, hi] = [0, ends.length];
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((ends[mid] ?? 0) <= start) lo = mid + 1;
			else hi = mid;
		}
		const before =
			lo > 0
				? (openBest[lo - 1] ?? Number.NEGATIVE_INFINITY)
				: Number.NEGATIVE_INFINITY;
		best = Math.max(best, revenue, before + revenue + start);
		const open = Math.max(revenue - end, before + revenue - (end - start));
		ends.push(end);
		openBest.push(Math.max(openBest.at(-1) ?? Number.NEGATIVE_INFINITY, open));
	}
	return best;
};

/**
 * 3440. Reschedule Meetings for Maximum Free Time II
 *
 * Meetings sit in an event from 0 to `eventTime`. Moving at most one meeting
 * anywhere (keeping its length, without overlaps), returns the longest free
 * stretch possible.
 *
 * Moving meeting i frees the gaps on both sides plus its own length, if it
 * fits into some other gap not touching it; otherwise it can only slide,
 * joining just the two neighbouring gaps. Prefix and suffix maxima of the
 * gaps say whether such a gap exists.
 *
 * @see https://leetcode.com/problems/reschedule-meetings-for-maximum-free-time-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * rescheduleMeetingsForMaximumFreeTimeII(5, [1, 3], [2, 5]); // 2
 */
export const rescheduleMeetingsForMaximumFreeTimeII = (
	eventTime: number,
	startTime: readonly number[],
	endTime: readonly number[],
): number => {
	const n = startTime.length;
	const gaps = Array.from(
		{ length: n + 1 },
		(_, i) =>
			(i === n ? eventTime : (startTime[i] ?? 0)) -
			(i === 0 ? 0 : (endTime[i - 1] ?? 0)),
	);
	const before = new Array<number>(n + 2).fill(0);
	for (let i = 0; i <= n; i++)
		before[i + 1] = Math.max(before[i] ?? 0, gaps[i] ?? 0);
	const after = new Array<number>(n + 2).fill(0);
	for (let i = n; i >= 0; i--)
		after[i] = Math.max(after[i + 1] ?? 0, gaps[i] ?? 0);
	let best = 0;
	for (let i = 0; i < n; i++) {
		const length = (endTime[i] ?? 0) - (startTime[i] ?? 0);
		const joined = (gaps[i] ?? 0) + (gaps[i + 1] ?? 0);
		const elsewhere = Math.max(before[i] ?? 0, after[i + 2] ?? 0);
		best = Math.max(best, elsewhere >= length ? joined + length : joined);
	}
	return best;
};

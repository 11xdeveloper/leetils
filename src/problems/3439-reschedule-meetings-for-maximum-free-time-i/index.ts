/**
 * 3439. Reschedule Meetings for Maximum Free Time I
 *
 * Meetings sit in an event from 0 to `eventTime`. Moving up to `k` of them
 * (keeping their order and lengths) returns the longest free stretch
 * possible.
 *
 * Shifting k consecutive meetings to one side merges the k + 1 gaps around
 * them, so take the largest sum of k + 1 neighbouring gaps.
 *
 * @see https://leetcode.com/problems/reschedule-meetings-for-maximum-free-time-i/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * rescheduleMeetingsForMaximumFreeTimeI(5, 1, [1, 3], [2, 5]); // 2
 */
export const rescheduleMeetingsForMaximumFreeTimeI = (
	eventTime: number,
	k: number,
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
	let window = 0;
	let best = 0;
	gaps.forEach((gap, i) => {
		window += gap;
		if (i > k) window -= gaps[i - k - 1] ?? 0;
		best = Math.max(best, window);
	});
	return best;
};

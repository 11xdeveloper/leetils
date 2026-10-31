/**
 * 3169. Count Days Without Meetings
 *
 * How many of the days 1 to `days` have no meeting, given meetings as
 * inclusive day ranges that may overlap.
 *
 * Sort the meetings and sweep, counting the days each one adds beyond the
 * latest covered day.
 *
 * @see https://leetcode.com/problems/count-days-without-meetings/
 * @difficulty Medium
 * @timeComplexity O(m log m)
 * @spaceComplexity O(m)
 *
 * @example
 * countDaysWithoutMeetings(10, [[5, 7], [1, 3], [9, 10]]); // 2
 */
export const countDaysWithoutMeetings = (
	days: number,
	meetings: readonly (readonly number[])[],
): number => {
	let covered = 0;
	let reached = 0;
	for (const [start = 0, end = 0] of meetings.toSorted(
		(a, b) => (a[0] ?? 0) - (b[0] ?? 0),
	)) {
		if (end <= reached) continue;
		covered += end - Math.max(start - 1, reached);
		reached = end;
	}
	return days - covered;
};

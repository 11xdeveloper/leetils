/**
 * 253. Meeting Rooms II
 *
 * Returns the fewest conference rooms needed to hold every meeting in
 * `intervals`, each `[start, end]`. A room freed at time `t` can be reused
 * by a meeting starting at `t`.
 *
 * The rooms needed is the most meetings running at once. Sorting the start
 * and end times separately and sweeping through them counts the meetings in
 * progress; an end at the same time as a start is processed first.
 *
 * @see https://leetcode.com/problems/meeting-rooms-ii/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * meetingRoomsII([[0, 30], [5, 10], [15, 20]]); // 2
 */
export const meetingRoomsII = (
	intervals: readonly (readonly number[])[],
): number => {
	const starts = intervals.map(([start = 0]) => start).sort((a, b) => a - b);
	const ends = intervals.map(([, end = 0]) => end).sort((a, b) => a - b);
	let rooms = 0;
	let most = 0;

	for (let i = 0, j = 0; i < starts.length; i++) {
		if ((starts[i] ?? 0) < (ends[j] ?? 0)) {
			rooms++;
		} else {
			j++;
		}
		most = Math.max(most, rooms);
	}

	return most;
};

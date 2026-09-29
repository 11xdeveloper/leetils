/**
 * 252. Meeting Rooms
 *
 * Returns whether one person can attend every meeting in `intervals`, each
 * `[start, end]`: no two meetings overlap. A meeting ending at time `t` and
 * another starting at `t` don't overlap.
 *
 * Sorted by start time, the meetings overlap exactly when one starts before
 * the previous one ends.
 *
 * @see https://leetcode.com/problems/meeting-rooms/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * meetingRooms([[0, 30], [5, 10], [15, 20]]); // false
 * meetingRooms([[7, 10], [2, 4]]); // true
 */
export const meetingRooms = (
	intervals: readonly (readonly number[])[],
): boolean => {
	const sorted = intervals.toSorted((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
	return sorted.every(
		(meeting, i) => i === 0 || (meeting[0] ?? 0) >= (sorted[i - 1]?.[1] ?? 0),
	);
};

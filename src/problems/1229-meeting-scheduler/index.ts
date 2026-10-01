/**
 * 1229. Meeting Scheduler
 *
 * Given two people's free slots `[start, end]` (each person's slots don't
 * overlap), returns the earliest `[start, start + duration]` that fits in a
 * slot of each, or `[]` if there's none.
 *
 * Sorts both lists by start and walks them together: the overlap of the
 * current two slots either fits the meeting or the slot ending first can be
 * dropped.
 *
 * @see https://leetcode.com/problems/meeting-scheduler/
 * @difficulty Medium
 * @timeComplexity O(m log m + n log n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * meetingScheduler([[10, 50], [60, 120], [140, 210]], [[0, 15], [60, 70]], 8); // [60, 68]
 */
export const meetingScheduler = (
	slots1: readonly (readonly number[])[],
	slots2: readonly (readonly number[])[],
	duration: number,
): number[] => {
	const byStart = (a: readonly number[], b: readonly number[]) =>
		(a[0] ?? 0) - (b[0] ?? 0);
	const [first, second] = [slots1.toSorted(byStart), slots2.toSorted(byStart)];
	let [i, j] = [0, 0];
	while (i < first.length && j < second.length) {
		const [start1 = 0, end1 = 0] = first[i] ?? [];
		const [start2 = 0, end2 = 0] = second[j] ?? [];
		const start = Math.max(start1, start2);
		if (Math.min(end1, end2) - start >= duration)
			return [start, start + duration];
		if (end1 < end2) i++;
		else j++;
	}
	return [];
};

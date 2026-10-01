/** An interval as LeetCode provides it: an object with `start` and `end`. */
interface Interval {
	start: number;
	end: number;
}

/**
 * 759. Employee Free Time
 *
 * Each employee's schedule is a sorted list of non-overlapping working
 * intervals. Returns, in order, the finite stretches of positive length
 * when every employee is free.
 *
 * Sorts all the working intervals by start and sweeps them, tracking the
 * latest end so far. A start after that end leaves a gap when nobody is
 * working.
 *
 * @see https://leetcode.com/problems/employee-free-time/
 * @difficulty Hard
 * @timeComplexity O(n log n) for n intervals
 * @spaceComplexity O(n)
 *
 * @example
 * employeeFreeTime([[{ start: 1, end: 2 }, { start: 5, end: 6 }], [{ start: 1, end: 3 }], [{ start: 4, end: 10 }]]); // [{ start: 3, end: 4 }]
 */
export const employeeFreeTime = (
	schedule: readonly (readonly Interval[])[],
): Interval[] => {
	const intervals = schedule.flat().sort((a, b) => a.start - b.start);
	const free: Interval[] = [];
	let latestEnd = intervals[0]?.end ?? 0;
	for (const { start, end } of intervals) {
		if (start > latestEnd) free.push({ start: latestEnd, end: start });
		latestEnd = Math.max(latestEnd, end);
	}
	return free;
};

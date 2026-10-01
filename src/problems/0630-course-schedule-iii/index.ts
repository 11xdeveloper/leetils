import { Heap } from "../../internal/heap";

/**
 * 630. Course Schedule III
 *
 * Course `[duration, lastDay]` takes `duration` consecutive days and must
 * finish by `lastDay`. Courses run one at a time, starting on day 1.
 * Returns the most courses you can take.
 *
 * Takes courses in order of deadline, adding each one. Whenever the total
 * time passes the current deadline, it drops the longest course taken so
 * far (from a max-heap), which frees the most time for the same count.
 *
 * @see https://leetcode.com/problems/course-schedule-iii/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * courseScheduleIII([[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]); // 3
 */
export const courseScheduleIII = (
	courses: readonly (readonly number[])[],
): number => {
	const byDeadline = courses.toSorted((a, b) => (a[1] ?? 0) - (b[1] ?? 0));
	const taken = new Heap<number>((a, b) => b - a);
	let time = 0;

	for (const [duration = 0, lastDay = 0] of byDeadline) {
		taken.push(duration);
		time += duration;
		if (time > lastDay) time -= taken.pop() ?? 0;
	}

	return taken.size;
};

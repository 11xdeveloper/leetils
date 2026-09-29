/**
 * 207. Course Schedule
 *
 * Returns whether all `numCourses` courses can be finished, where each pair
 * `[a, b]` in `prerequisites` means course `b` must be taken before `a`. It
 * can unless the prerequisites form a cycle.
 *
 * Kahn's algorithm: repeatedly takes a course with no prerequisites left,
 * removing it from the courses that depend on it. Every course gets taken
 * exactly when there is no cycle.
 *
 * @see https://leetcode.com/problems/course-schedule/
 * @difficulty Medium
 * @timeComplexity O(V + E)
 * @spaceComplexity O(V + E)
 *
 * @example
 * courseSchedule(2, [[1, 0]]); // true
 * courseSchedule(2, [[1, 0], [0, 1]]); // false
 */
export const courseSchedule = (
	numCourses: number,
	prerequisites: readonly (readonly number[])[],
): boolean => {
	const dependents: number[][] = Array.from({ length: numCourses }, () => []);
	const remaining = new Array<number>(numCourses).fill(0);
	for (const [course = 0, prerequisite = 0] of prerequisites) {
		dependents[prerequisite]?.push(course);
		remaining[course] = (remaining[course] ?? 0) + 1;
	}

	const ready = remaining.flatMap((count, course) =>
		count === 0 ? [course] : [],
	);
	for (let head = 0; head < ready.length; head++) {
		for (const dependent of dependents[ready[head] ?? 0] ?? []) {
			remaining[dependent] = (remaining[dependent] ?? 0) - 1;
			if (remaining[dependent] === 0) ready.push(dependent);
		}
	}

	return ready.length === numCourses;
};

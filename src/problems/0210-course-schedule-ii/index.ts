/**
 * 210. Course Schedule II
 *
 * Returns an order in which all `numCourses` courses can be taken, where each
 * pair `[a, b]` in `prerequisites` means course `b` must be taken before
 * `a`, or an empty array if the prerequisites form a cycle.
 *
 * Kahn's algorithm: repeatedly takes a course with no prerequisites left,
 * removing it from the courses that depend on it. The order they're taken in
 * is a valid schedule.
 *
 * @see https://leetcode.com/problems/course-schedule-ii/
 * @difficulty Medium
 * @timeComplexity O(V + E)
 * @spaceComplexity O(V + E)
 *
 * @example
 * courseScheduleII(4, [[1, 0], [2, 0], [3, 1], [3, 2]]); // [0, 1, 2, 3]
 */
export const courseScheduleII = (
	numCourses: number,
	prerequisites: readonly (readonly number[])[],
): number[] => {
	const dependents: number[][] = Array.from({ length: numCourses }, () => []);
	const remaining = new Array<number>(numCourses).fill(0);
	for (const [course = 0, prerequisite = 0] of prerequisites) {
		dependents[prerequisite]?.push(course);
		remaining[course] = (remaining[course] ?? 0) + 1;
	}

	const order = remaining.flatMap((count, course) =>
		count === 0 ? [course] : [],
	);
	for (let head = 0; head < order.length; head++) {
		for (const dependent of dependents[order[head] ?? 0] ?? []) {
			remaining[dependent] = (remaining[dependent] ?? 0) - 1;
			if (remaining[dependent] === 0) order.push(dependent);
		}
	}

	return order.length === numCourses ? order : [];
};

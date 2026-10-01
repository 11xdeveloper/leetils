/**
 * 1136. Parallel Courses
 *
 * Courses `1 … n` have prerequisites `relations[i] = [before, after]`. Each
 * semester, any number of courses can be taken whose prerequisites were
 * all taken in earlier semesters. Returns the fewest semesters needed to
 * take every course, or -1 if the prerequisites form a cycle.
 *
 * Kahn's algorithm, one semester per layer: start with the courses that
 * have no prerequisites, and each semester unlock the courses whose last
 * prerequisite was just taken.
 *
 * @see https://leetcode.com/problems/parallel-courses/
 * @difficulty Medium
 * @timeComplexity O(n + r) for r relations
 * @spaceComplexity O(n + r)
 *
 * @example
 * parallelCourses(3, [[1, 3], [2, 3]]); // 2
 */
export const parallelCourses = (
	n: number,
	relations: readonly (readonly number[])[],
): number => {
	const unlocks = Array.from({ length: n + 1 }, (): number[] => []);
	const waiting = new Array<number>(n + 1).fill(0);
	for (const [before = 0, after = 0] of relations) {
		unlocks[before]?.push(after);
		waiting[after] = (waiting[after] ?? 0) + 1;
	}
	let semester: number[] = [];
	for (let course = 1; course <= n; course++) {
		if (waiting[course] === 0) semester.push(course);
	}
	let [semesters, taken] = [0, 0];
	while (semester.length > 0) {
		semesters++;
		taken += semester.length;
		const next: number[] = [];
		for (const course of semester) {
			for (const after of unlocks[course] ?? []) {
				waiting[after] = (waiting[after] ?? 0) - 1;
				if (waiting[after] === 0) next.push(after);
			}
		}
		semester = next;
	}
	return taken === n ? semesters : -1;
};

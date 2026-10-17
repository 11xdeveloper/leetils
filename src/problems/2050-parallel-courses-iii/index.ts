/**
 * 2050. Parallel Courses III
 *
 * Course `i` (1-based) takes `time[i - 1]` months, and each relation
 * `[a, b]` requires `a` to finish before `b` starts. Courses can run in
 * parallel. Returns the fewest months to finish them all.
 *
 * Take courses in topological order; each finishes its duration after
 * the latest of its prerequisites.
 *
 * @see https://leetcode.com/problems/parallel-courses-iii/
 * @difficulty Hard
 * @timeComplexity O(n + r)
 * @spaceComplexity O(n + r)
 *
 * @example
 * parallelCoursesIII(3, [[1, 3], [2, 3]], [3, 2, 5]); // 8
 */
export const parallelCoursesIII = (
	n: number,
	relations: readonly (readonly number[])[],
	time: readonly number[],
): number => {
	const next: number[][] = Array.from({ length: n }, () => []);
	const waiting = new Array<number>(n).fill(0);
	for (const [before = 1, after = 1] of relations) {
		next[before - 1]?.push(after - 1);
		waiting[after - 1] = (waiting[after - 1] ?? 0) + 1;
	}
	const start = new Array<number>(n).fill(0);
	const queue = waiting.flatMap((count, course) => (count ? [] : [course]));
	let finish = 0;
	for (let head = 0; head < queue.length; head++) {
		const course = queue[head] ?? 0;
		const end = (start[course] ?? 0) + (time[course] ?? 0);
		finish = Math.max(finish, end);
		for (const later of next[course] ?? []) {
			start[later] = Math.max(start[later] ?? 0, end);
			waiting[later] = (waiting[later] ?? 0) - 1;
			if (waiting[later] === 0) queue.push(later);
		}
	}
	return finish;
};

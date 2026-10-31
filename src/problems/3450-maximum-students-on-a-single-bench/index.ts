/**
 * 3450. Maximum Students on a Single Bench
 *
 * `students[i] = [studentId, benchId]` records a student on a bench (maybe
 * more than once). Returns the most distinct students on any bench, or 0.
 *
 * Collect a set of students per bench.
 *
 * @see https://leetcode.com/problems/maximum-students-on-a-single-bench/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumStudentsOnASingleBench([[1, 2], [2, 2], [3, 3], [1, 3], [2, 3]]); // 3
 */
export const maximumStudentsOnASingleBench = (
	students: readonly (readonly number[])[],
): number => {
	const benches = new Map<number, Set<number>>();
	for (const [student = 0, bench = 0] of students) {
		const set = benches.get(bench) ?? new Set<number>();
		set.add(student);
		benches.set(bench, set);
	}
	let best = 0;
	for (const set of benches.values()) best = Math.max(best, set.size);
	return best;
};

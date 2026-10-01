/**
 * 1462. Course Schedule IV
 *
 * With `prerequisites[i] = [a, b]` meaning `a` comes before `b` (directly or
 * through other courses), answers each query `[u, v]`: is `u` a prerequisite
 * of `v`?
 *
 * Computes the transitive closure with Floyd–Warshall, then answers each
 * query by lookup.
 *
 * @see https://leetcode.com/problems/course-schedule-iv/
 * @difficulty Medium
 * @timeComplexity O(n^3 + q)
 * @spaceComplexity O(n^2)
 *
 * @example
 * courseScheduleIV(3, [[1, 2], [1, 0], [2, 0]], [[1, 0], [1, 2]]); // [true, true]
 */
export const courseScheduleIV = (
	numCourses: number,
	prerequisites: readonly (readonly number[])[],
	queries: readonly (readonly number[])[],
): boolean[] => {
	const n = numCourses;
	const before = Array.from({ length: n }, () => new Uint8Array(n));
	for (const [a = 0, b = 0] of prerequisites) {
		const row = before[a];
		if (row) row[b] = 1;
	}
	for (let k = 0; k < n; k++) {
		const rowK = before[k] ?? new Uint8Array(n);
		for (const row of before) {
			if (!row[k]) continue;
			for (let j = 0; j < n; j++) if (rowK[j]) row[j] = 1;
		}
	}
	return queries.map(([u = 0, v = 0]) => before[u]?.[v] === 1);
};

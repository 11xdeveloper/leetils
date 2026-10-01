/**
 * 1986. Minimum Number of Work Sessions to Finish the Tasks
 *
 * Each work session lasts at most `sessionTime`, and a task can't be split
 * across sessions. Returns the fewest sessions finishing every task (at
 * most 14).
 *
 * Bitmask dynamic programming: for each set of finished tasks, the best is
 * the fewest sessions and then the least time used in the current one.
 * Adding a task either fits in the current session or opens a new one.
 *
 * @see https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks/
 * @difficulty Medium
 * @timeComplexity O(2^n · n)
 * @spaceComplexity O(2^n)
 *
 * @example
 * minimumNumberOfWorkSessionsToFinishTheTasks([3, 1, 3, 1, 1], 8); // 2
 */
export const minimumNumberOfWorkSessionsToFinishTheTasks = (
	tasks: readonly number[],
	sessionTime: number,
): number => {
	const n = tasks.length;
	// best[mask] = [sessions, time used in the last session].
	const best: [number, number][] = new Array(1 << n).fill([Infinity, Infinity]);
	best[0] = [1, 0];
	const better = (a: readonly [number, number], b: readonly [number, number]) =>
		a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
	for (let mask = 0; mask < 1 << n; mask++) {
		const [sessions, used] = best[mask] ?? [Infinity, Infinity];
		if (sessions === Infinity) continue;
		for (let task = 0; task < n; task++) {
			if (mask & (1 << task)) continue;
			const time = tasks[task] ?? 0;
			const candidate: [number, number] =
				used + time <= sessionTime
					? [sessions, used + time]
					: [sessions + 1, time];
			const next = mask | (1 << task);
			if (better(candidate, best[next] ?? [Infinity, Infinity]))
				best[next] = candidate;
		}
	}
	return best[(1 << n) - 1]?.[0] ?? 0;
};

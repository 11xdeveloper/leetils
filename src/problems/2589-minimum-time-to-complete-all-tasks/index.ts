/**
 * 2589. Minimum Time to Complete All Tasks
 *
 * Each task `[start, end, duration]` must run for `duration` seconds,
 * not necessarily contiguous, within `[start, end]`. The computer runs
 * any number of tasks at once. Returns the fewest seconds it must be on.
 *
 * Handle tasks by end time. Count the seconds already on in a task's
 * window, and switch on any still needed as late as possible, where later
 * tasks are most likely to share them.
 *
 * @see https://leetcode.com/problems/minimum-time-to-complete-all-tasks/
 * @difficulty Hard
 * @timeComplexity O(n log n + n · T), where `T` is the latest end
 * @spaceComplexity O(T)
 *
 * @example
 * minimumTimeToCompleteAllTasks([[1, 3, 2], [2, 5, 3], [5, 6, 2]]); // 4
 */
export const minimumTimeToCompleteAllTasks = (
	tasks: readonly (readonly number[])[],
): number => {
	const sorted = tasks.toSorted((a, b) => (a[1] ?? 0) - (b[1] ?? 0));
	const on = new Uint8Array((sorted.at(-1)?.[1] ?? 0) + 1);
	let total = 0;
	for (const [start = 0, end = 0, duration = 0] of sorted) {
		let needed = duration;
		for (let t = start; t <= end; t++) needed -= on[t] ?? 0;
		for (let t = end; needed > 0; t--)
			if (!on[t]) {
				on[t] = 1;
				needed--;
				total++;
			}
	}
	return total;
};

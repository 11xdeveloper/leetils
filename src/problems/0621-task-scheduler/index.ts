/**
 * 621. Task Scheduler
 *
 * A CPU runs one task (a letter) or idles in each interval, and two runs of
 * the same task must be at least `n` intervals apart. Returns the fewest
 * intervals needed to run all `tasks`.
 *
 * The most frequent task, run `max` times, needs `max - 1` gaps of length
 * `n` after its runs, so at least `(max - 1) · (n + 1)` intervals, plus one
 * final slot for every task tied for most frequent. Other tasks fit in the
 * gaps; if there are more than the gaps can hold, no idling is needed at
 * all and the answer is just the number of tasks.
 *
 * @see https://leetcode.com/problems/task-scheduler/
 * @difficulty Medium
 * @timeComplexity O(t) for t tasks
 * @spaceComplexity O(1), 26 counts
 *
 * @example
 * taskScheduler(["A", "A", "A", "B", "B", "B"], 2); // 8: A B idle A B idle A B
 */
export const taskScheduler = (tasks: readonly string[], n: number): number => {
	const counts = new Map<string, number>();
	for (const task of tasks) counts.set(task, (counts.get(task) ?? 0) + 1);
	const most = Math.max(...counts.values());
	const tiedForMost = [...counts.values()].filter(
		(count) => count === most,
	).length;
	return Math.max(tasks.length, (most - 1) * (n + 1) + tiedForMost);
};

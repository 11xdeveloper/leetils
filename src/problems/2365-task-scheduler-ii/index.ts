/**
 * 2365. Task Scheduler II
 *
 * Completes `tasks` in order, one per day, waiting at least `space` days
 * between tasks of the same type. Returns the days needed.
 *
 * Remember when each type last ran and skip ahead when needed.
 *
 * @see https://leetcode.com/problems/task-scheduler-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * taskSchedulerII([1, 2, 1, 2, 3, 1], 3); // 9
 */
export const taskSchedulerII = (
	tasks: readonly number[],
	space: number,
): number => {
	const last = new Map<number, number>();
	let day = 0;
	for (const task of tasks) {
		day = Math.max(day + 1, (last.get(task) ?? -Infinity) + space + 1);
		last.set(task, day);
	}
	return day;
};

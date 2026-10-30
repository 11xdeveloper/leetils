/**
 * 2244. Minimum Rounds to Complete All Tasks
 *
 * Each round completes 2 or 3 tasks of the same difficulty. Returns the
 * fewest rounds to complete them all, or -1 if impossible.
 *
 * A difficulty with `c > 1` tasks takes `⌈c / 3⌉` rounds; a single task
 * can't be done.
 *
 * @see https://leetcode.com/problems/minimum-rounds-to-complete-all-tasks/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumRoundsToCompleteAllTasks([2, 2, 3, 3, 2, 4, 4, 4, 4, 4]); // 4
 */
export const minimumRoundsToCompleteAllTasks = (
	tasks: readonly number[],
): number => {
	const counts = new Map<number, number>();
	for (const task of tasks) counts.set(task, (counts.get(task) ?? 0) + 1);
	let rounds = 0;
	for (const count of counts.values()) {
		if (count === 1) return -1;
		rounds += Math.ceil(count / 3);
	}
	return rounds;
};

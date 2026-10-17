/**
 * 2071. Maximum Number of Tasks You Can Assign
 *
 * A worker can do a task needing at most their strength; each of `pills`
 * pills, used on a different worker, adds `strength`. Each worker does at
 * most one task. Returns the most tasks that can be done.
 *
 * Binary search the answer `k`: the `k` easiest tasks against the `k`
 * strongest workers. Check by taking workers from weakest up, queueing
 * the tasks each could do with a pill. A worker does the easiest queued
 * task unaided if they can; otherwise they take a pill and the hardest
 * queued task.
 *
 * @see https://leetcode.com/problems/maximum-number-of-tasks-you-can-assign/
 * @difficulty Hard
 * @timeComplexity O(n log n + m log m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * maximumNumberOfTasksYouCanAssign([3, 2, 1], [0, 3, 3], 1, 1); // 3
 */
export const maximumNumberOfTasksYouCanAssign = (
	tasks: readonly number[],
	workers: readonly number[],
	pills: number,
	strength: number,
): number => {
	const sortedTasks = tasks.toSorted((a, b) => a - b);
	const sortedWorkers = workers.toSorted((a, b) => a - b);

	const canDo = (k: number): boolean => {
		const reachable: number[] = [];
		let [front, next, pillsLeft] = [0, 0, pills];
		for (let i = sortedWorkers.length - k; i < sortedWorkers.length; i++) {
			const worker = sortedWorkers[i] ?? 0;
			while (next < k && (sortedTasks[next] ?? 0) <= worker + strength)
				reachable.push(sortedTasks[next++] ?? 0);
			if (front === reachable.length) return false;
			if ((reachable[front] ?? 0) <= worker) front++;
			else if (pillsLeft-- > 0) reachable.pop();
			else return false;
		}
		return true;
	};

	let [lo, hi] = [0, Math.min(tasks.length, workers.length)];
	while (lo < hi) {
		const k = (lo + hi + 1) >> 1;
		if (canDo(k)) lo = k;
		else hi = k - 1;
	}
	return lo;
};

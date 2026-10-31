/**
 * 4012. Count of Unfinished Tasks After Each Shift
 *
 * Work through `tasks` in order during each shift, carrying a part-done
 * task into the next shift. A shift that finishes every task ends early
 * and the next starts over from the first task. Returns how many tasks
 * are unfinished after each shift.
 *
 * Track how far into the whole list of tasks the work has got. A shift
 * either reaches the end (everything done, start again) or stops partway,
 * where a binary search on prefix sums counts the finished tasks.
 *
 * @see https://leetcode.com/problems/count-of-unfinished-tasks-after-each-shift/
 * @difficulty Medium
 * @timeComplexity O(n + s log n)
 * @spaceComplexity O(n)
 *
 * @example
 * countOfUnfinishedTasksAfterEachShift([4, 2], [3, 6, 1]); // [2, 0, 2]
 */
export const countOfUnfinishedTasksAfterEachShift = (
	tasks: readonly number[],
	shifts: readonly number[],
): number[] => {
	const n = tasks.length;
	const prefix = [0];
	for (const t of tasks) prefix.push((prefix.at(-1) ?? 0) + t);
	const total = prefix[n] ?? 0;
	let done = 0;
	return shifts.map((shift) => {
		if (done + shift >= total) {
			done = 0;
			return 0;
		}
		done += shift;
		// Tasks fully completed: the largest k with prefix[k] ≤ done.
		let [lo, hi] = [0, n];
		while (lo < hi) {
			const mid = (lo + hi + 1) >>> 1;
			if ((prefix[mid] ?? 0) <= done) lo = mid;
			else hi = mid - 1;
		}
		return n - lo;
	});
};

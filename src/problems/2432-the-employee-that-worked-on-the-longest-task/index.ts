/**
 * 2432. The Employee That Worked on the Longest Task
 *
 * Tasks run back to back from time 0; `logs[i] = [id, leaveTime]` ends
 * task `i`. Returns the employee with the longest task (smallest id on
 * ties).
 *
 * @see https://leetcode.com/problems/the-employee-that-worked-on-the-longest-task/
 * @difficulty Easy
 * @timeComplexity O(m)
 * @spaceComplexity O(1)
 *
 * @example
 * theEmployeeThatWorkedOnTheLongestTask(10, [[0, 3], [2, 5], [0, 9], [1, 15]]); // 1
 */
export const theEmployeeThatWorkedOnTheLongestTask = (
	_n: number,
	logs: readonly (readonly number[])[],
): number => {
	let [best, longest, previous] = [Infinity, 0, 0];
	for (const [id = 0, leave = 0] of logs) {
		const length = leave - previous;
		if (length > longest || (length === longest && id < best))
			[best, longest] = [id, length];
		previous = leave;
	}
	return best;
};

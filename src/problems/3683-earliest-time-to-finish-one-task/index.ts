/**
 * 3683. Earliest Time to Finish One Task
 *
 * Task `[s, t]` starts at s and takes t. Returns the earliest time any
 * task finishes.
 *
 * @see https://leetcode.com/problems/earliest-time-to-finish-one-task/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * earliestTimeToFinishOneTask([[1, 6], [2, 3]]); // 5
 */
export const earliestTimeToFinishOneTask = (
	tasks: readonly (readonly number[])[],
): number => Math.min(...tasks.map(([s = 0, t = 0]) => s + t));

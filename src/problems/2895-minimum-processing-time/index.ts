/**
 * 2895. Minimum Processing Time
 *
 * Each processor has four cores and becomes free at `processorTime[i]`;
 * each core runs one task. Returns the earliest time all tasks can be
 * done.
 *
 * Give the longest tasks to the processors that free up first: sort one
 * ascending and the other descending, and each processor's slowest task
 * is the first of its four.
 *
 * @see https://leetcode.com/problems/minimum-processing-time/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumProcessingTime([8, 10], [2, 2, 3, 1, 8, 7, 4, 5]); // 16
 */
export const minimumProcessingTime = (
	processorTime: readonly number[],
	tasks: readonly number[],
): number => {
	const processors = processorTime.toSorted((a, b) => a - b);
	const longestFirst = tasks.toSorted((a, b) => b - a);
	return Math.max(
		...processors.map((free, i) => free + (longestFirst[4 * i] ?? 0)),
	);
};

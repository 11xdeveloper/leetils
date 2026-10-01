/**
 * 1450. Number of Students Doing Homework at a Given Time
 *
 * Returns how many students were doing homework at `queryTime`, student `i`
 * working from `startTime[i]` to `endTime[i]` inclusive.
 *
 * Checks each student's interval.
 *
 * @see https://leetcode.com/problems/number-of-students-doing-homework-at-a-given-time/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfStudentsDoingHomeworkAtAGivenTime([1, 2, 3], [3, 2, 7], 4); // 1
 */
export const numberOfStudentsDoingHomeworkAtAGivenTime = (
	startTime: readonly number[],
	endTime: readonly number[],
	queryTime: number,
): number =>
	startTime.filter(
		(start, i) => start <= queryTime && queryTime <= (endTime[i] ?? 0),
	).length;

/**
 * 2323. Find Minimum Time to Finish All Jobs II
 *
 * Each worker takes one job; worker `j` does `workers[j]` units a day, so
 * job `i` takes `⌈jobs[i] / workers[j]⌉` days. Returns the fewest days to
 * finish every job.
 *
 * Pair the jobs and workers in sorted order.
 *
 * @see https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs-ii/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findMinimumTimeToFinishAllJobsII([5, 2, 4], [1, 7, 5]); // 2
 */
export const findMinimumTimeToFinishAllJobsII = (
	jobs: readonly number[],
	workers: readonly number[],
): number => {
	const sortedWorkers = workers.toSorted((a, b) => a - b);
	return Math.max(
		...jobs
			.toSorted((a, b) => a - b)
			.map((job, i) => Math.ceil(job / (sortedWorkers[i] ?? 1))),
	);
};

/**
 * 1235. Maximum Profit in Job Scheduling
 *
 * Job `i` runs from `startTime[i]` to `endTime[i]` for `profit[i]`. Returns
 * the most profit from jobs that don't overlap (one may start when another
 * ends).
 *
 * Sorts the jobs by end time. `best[i]` is the most profit from the first
 * `i` jobs: either skip job `i`, or take it along with the best of the jobs
 * ending by its start, found by binary search.
 *
 * @see https://leetcode.com/problems/maximum-profit-in-job-scheduling/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumProfitInJobScheduling([1, 2, 3, 3], [3, 4, 5, 6], [50, 10, 40, 70]); // 120
 */
export const maximumProfitInJobScheduling = (
	startTime: readonly number[],
	endTime: readonly number[],
	profit: readonly number[],
): number => {
	const jobs = startTime
		.map((start, i) => [start, endTime[i] ?? 0, profit[i] ?? 0] as const)
		.sort((a, b) => a[1] - b[1]);
	const best = new Array<number>(jobs.length + 1).fill(0);
	jobs.forEach(([start, , gain], i) => {
		// How many jobs end by `start`.
		let [low, high] = [0, i];
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((jobs[mid]?.[1] ?? 0) <= start) low = mid + 1;
			else high = mid;
		}
		best[i + 1] = Math.max(best[i] ?? 0, (best[low] ?? 0) + gain);
	});
	return best[jobs.length] ?? 0;
};

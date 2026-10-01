/**
 * 826. Most Profit Assigning Work
 *
 * Job `i` has a difficulty and a profit, and each worker can do one job (any
 * job, any number of times across workers) with difficulty at most their
 * ability. Returns the most total profit.
 *
 * Each worker should take the most profitable job they can do. With jobs
 * sorted by difficulty and workers by ability, a pointer through the jobs
 * keeps the best profit available to the current worker.
 *
 * @see https://leetcode.com/problems/most-profit-assigning-work/
 * @difficulty Medium
 * @timeComplexity O(n log n + m log m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * mostProfitAssigningWork([2, 4, 6, 8, 10], [10, 20, 30, 40, 50], [4, 5, 6, 7]); // 100
 */
export const mostProfitAssigningWork = (
	difficulty: readonly number[],
	profit: readonly number[],
	worker: readonly number[],
): number => {
	const jobs = difficulty
		.map((d, i) => [d, profit[i] ?? 0] as const)
		.sort((a, b) => a[0] - b[0]);
	let total = 0;
	let best = 0;
	let next = 0;
	for (const ability of worker.toSorted((a, b) => a - b)) {
		while (next < jobs.length && (jobs[next]?.[0] ?? 0) <= ability)
			best = Math.max(best, jobs[next++]?.[1] ?? 0);
		total += best;
	}
	return total;
};

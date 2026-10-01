/**
 * 1723. Find Minimum Time to Finish All Jobs
 *
 * Assigns every job (at most 12) to one of `k` workers. Returns the
 * smallest possible maximum total time of a worker.
 *
 * `best[mask]` is the smallest maximum load for doing the jobs in `mask`
 * with the workers so far; each new worker takes some subset of the
 * remaining jobs.
 *
 * @see https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs/
 * @difficulty Hard
 * @timeComplexity O(k · 3^n)
 * @spaceComplexity O(2^n)
 *
 * @example
 * findMinimumTimeToFinishAllJobs([1, 2, 4, 7, 8], 2); // 11
 */
export const findMinimumTimeToFinishAllJobs = (
	jobs: readonly number[],
	k: number,
): number => {
	const n = jobs.length;
	const full = (1 << n) - 1;
	const load = new Array<number>(1 << n).fill(0);
	for (let mask = 1; mask <= full; mask++) {
		const lowest = 31 - Math.clz32(mask & -mask);
		load[mask] = (load[mask & (mask - 1)] ?? 0) + (jobs[lowest] ?? 0);
	}
	let best = load.slice();
	for (let worker = 2; worker <= k; worker++) {
		const next = best.slice();
		for (let mask = 1; mask <= full; mask++) {
			for (let sub = mask; sub > 0; sub = (sub - 1) & mask) {
				const candidate = Math.max(best[mask ^ sub] ?? 0, load[sub] ?? 0);
				if (candidate < (next[mask] ?? Infinity)) next[mask] = candidate;
			}
		}
		best = next;
	}
	return best[full] ?? 0;
};

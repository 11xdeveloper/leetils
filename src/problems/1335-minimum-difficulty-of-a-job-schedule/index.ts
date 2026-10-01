/**
 * 1335. Minimum Difficulty of a Job Schedule
 *
 * Splits the jobs, in order, over `d` days with at least one job a day. A
 * day's difficulty is its hardest job. Returns the smallest total
 * difficulty, or -1 if there are fewer jobs than days.
 *
 * Dynamic programming over days: `best[i]` is the cheapest way to do the
 * first `i` jobs in the days so far. Adding a day tries every start for
 * its jobs, walking back from the end while tracking the hardest.
 *
 * @see https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule/
 * @difficulty Hard
 * @timeComplexity O(d · n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumDifficultyOfAJobSchedule([6, 5, 4, 3, 2, 1], 2); // 7
 */
export const minimumDifficultyOfAJobSchedule = (
	jobDifficulty: readonly number[],
	d: number,
): number => {
	const n = jobDifficulty.length;
	if (n < d) return -1;
	let best = new Array<number>(n + 1).fill(Infinity);
	best[0] = 0;
	for (let day = 1; day <= d; day++) {
		const next = new Array<number>(n + 1).fill(Infinity);
		for (let end = day; end <= n; end++) {
			let hardest = 0;
			for (let start = end - 1; start >= day - 1; start--) {
				hardest = Math.max(hardest, jobDifficulty[start] ?? 0);
				next[end] = Math.min(
					next[end] ?? Infinity,
					(best[start] ?? Infinity) + hardest,
				);
			}
		}
		best = next;
	}
	return best[n] ?? -1;
};

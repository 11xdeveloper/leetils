/**
 * 3414. Maximum Score of Non-overlapping Intervals
 *
 * Choose at most four intervals `[l, r, weight]` that share no points.
 * Returns the indices of a choice with the largest total weight, the
 * lexicographically smallest on a tie.
 *
 * Sort by start. Let `best[i][j]` be the best (weight, sorted indices) using
 * up to j intervals from the i-th onwards: skip interval i, or take it and
 * continue from the first interval starting after it ends (found by binary
 * search).
 *
 * @see https://leetcode.com/problems/maximum-score-of-non-overlapping-intervals/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumScoreOfNonOverlappingIntervals([[1, 3, 2], [4, 5, 2], [1, 5, 5], [6, 9, 3], [6, 7, 1], [8, 9, 1]]); // [2, 3]
 */
export const maximumScoreOfNonOverlappingIntervals = (
	intervals: readonly (readonly number[])[],
): number[] => {
	const n = intervals.length;
	const order = intervals
		.map((_, i) => i)
		.sort((a, b) => (intervals[a]?.[0] ?? 0) - (intervals[b]?.[0] ?? 0));
	const starts = order.map((i) => intervals[i]?.[0] ?? 0);
	const after = (end: number): number => {
		let lo = 0;
		let hi = n;
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((starts[mid] ?? 0) > end) hi = mid;
			else lo = mid + 1;
		}
		return lo;
	};
	type Choice = [weight: number, indices: number[]];
	const better = (a: Choice, b: Choice): boolean => {
		if (a[0] !== b[0]) return a[0] > b[0];
		for (let i = 0; i < Math.min(a[1].length, b[1].length); i++)
			if (a[1][i] !== b[1][i]) return (a[1][i] ?? 0) < (b[1][i] ?? 0);
		return a[1].length < b[1].length;
	};
	// best[i][j]: up to j intervals chosen from order[i..].
	const best: Choice[][] = Array.from({ length: n + 1 }, () =>
		Array.from({ length: 5 }, (): Choice => [0, []]),
	);
	for (let i = n - 1; i >= 0; i--) {
		const index = order[i] ?? 0;
		const [, end = 0, weight = 0] = intervals[index] ?? [];
		const next = after(end);
		for (let j = 1; j <= 4; j++) {
			const skip = best[i + 1]?.[j] ?? [0, []];
			const rest = best[next]?.[j - 1] ?? [0, []];
			const take: Choice = [
				rest[0] + weight,
				[index, ...rest[1]].sort((a, b) => a - b),
			];
			const row = best[i];
			if (row) row[j] = better(take, skip) ? take : skip;
		}
	}
	return best[0]?.[4]?.[1] ?? [];
};

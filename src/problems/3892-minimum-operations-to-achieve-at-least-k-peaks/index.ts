/**
 * 3892. Minimum Operations to Achieve At Least K Peaks
 *
 * In the circular array `nums`, a peak beats both neighbours; increments
 * are the only operation. Returns the fewest increments giving at least
 * `k` peaks, or -1.
 *
 * Peaks can't be adjacent, and each one only needs raising itself above
 * its neighbours, so choose k non-adjacent indices around the circle of
 * least total cost (at most ⌊n/2⌋ fit). Break the circle by whether index
 * 0 is a peak, then dynamic programming over the line by peaks chosen.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-achieve-at-least-k-peaks/
 * @difficulty Hard
 * @timeComplexity O(n · k)
 * @spaceComplexity O(k)
 *
 * @example
 * minimumOperationsToAchieveAtLeastKPeaks([2, 1, 2], 1); // 1
 */
export const minimumOperationsToAchieveAtLeastKPeaks = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	if (k === 0) return 0;
	if (k > Math.floor(n / 2)) return -1;
	const cost = nums.map((x, i) =>
		Math.max(
			0,
			Math.max(nums[(i - 1 + n) % n] ?? 0, nums[(i + 1) % n] ?? 0) + 1 - x,
		),
	);
	/** Cheapest way to pick `want` non-adjacent indices from `from` to `to`. */
	const line = (from: number, to: number, want: number): number => {
		if (want <= 0) return 0;
		let skip = new Array<number>(want + 1).fill(Number.POSITIVE_INFINITY);
		let take = new Array<number>(want + 1).fill(Number.POSITIVE_INFINITY);
		skip[0] = 0;
		for (let i = from; i <= to; i++) {
			const nextSkip = skip.map((value, j) =>
				Math.min(value, take[j] ?? Number.POSITIVE_INFINITY),
			);
			const nextTake = skip.map((_, j) =>
				j > 0
					? (skip[j - 1] ?? Number.POSITIVE_INFINITY) + (cost[i] ?? 0)
					: Number.POSITIVE_INFINITY,
			);
			[skip, take] = [nextSkip, nextTake];
		}
		return Math.min(
			skip[want] ?? Number.POSITIVE_INFINITY,
			take[want] ?? Number.POSITIVE_INFINITY,
		);
	};
	const best = Math.min(
		line(1, n - 1, k),
		(cost[0] ?? 0) + line(2, n - 2, k - 1),
	);
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};

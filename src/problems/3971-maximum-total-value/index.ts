const MOD = 1_000_000_007n;

/**
 * 3971. Maximum Total Value
 *
 * Selecting index i for the t-th time gains `value[i] - decay[i] · (t - 1)`.
 * With at most `m` selections, returns the largest total, modulo 1e9+7.
 *
 * Take the m largest positive gains. Binary search the smallest threshold
 * whose gains at or above it number at most m, take all of those, and
 * fill up with gains just below it. Sums of each index's arithmetic run
 * go through BigInt.
 *
 * @see https://leetcode.com/problems/maximum-total-value/
 * @difficulty Hard
 * @timeComplexity O(n log V)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumTotalValue([6, 5, 4], [2, 1, 1], 4); // 19
 */
export const maximumTotalValue = (
	value: readonly number[],
	decay: readonly number[],
	m: number,
): number => {
	/** Gains of at least t, capped above m. */
	const atLeast = (t: number): number => {
		let count = 0;
		value.forEach((v, i) => {
			if (v >= t && count <= m)
				count += Math.floor((v - t) / (decay[i] ?? 1)) + 1;
		});
		return count;
	};
	let [lo, hi] = [1, Math.max(...value) + 1];
	while (lo < hi) {
		const mid = lo + Math.floor((hi - lo) / 2);
		if (atLeast(mid) <= m) hi = mid;
		else lo = mid + 1;
	}
	let total = 0n;
	let taken = 0;
	value.forEach((v, i) => {
		if (v < lo) return;
		const d = decay[i] ?? 1;
		const c = Math.floor((v - lo) / d) + 1;
		taken += c;
		total +=
			BigInt(c) * BigInt(v) - (BigInt(d) * BigInt(c) * BigInt(c - 1)) / 2n;
	});
	if (lo > 1)
		total +=
			BigInt(Math.min(m - taken, atLeast(lo - 1) - taken)) * BigInt(lo - 1);
	return Number(total % MOD);
};

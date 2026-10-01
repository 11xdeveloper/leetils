/**
 * 1420. Build Array Where You Can Find The Maximum Exactly K Comparisons
 *
 * Counts the arrays of `n` values from 1 to `m` in which a new maximum
 * appears exactly `k` times scanning left to right, modulo 10^9 + 7.
 *
 * Dynamic programming over length, current maximum `j` and new-maximum
 * count: the next value is either at most `j` (`j` choices, same state) or
 * a new, larger maximum. Prefix sums over `j` make each step constant time.
 *
 * @see https://leetcode.com/problems/build-array-where-you-can-find-the-maximum-exactly-k-comparisons/
 * @difficulty Hard
 * @timeComplexity O(n · m · k)
 * @spaceComplexity O(m · k)
 *
 * @example
 * buildArrayWhereYouCanFindTheMaximumExactlyKComparisons(2, 3, 1); // 6
 */
export const buildArrayWhereYouCanFindTheMaximumExactlyKComparisons = (
	n: number,
	m: number,
	k: number,
): number => {
	const MOD = 1_000_000_007;
	if (k === 0) return 0;
	// ways[j][c]: arrays of the current length with maximum j and c new maxima.
	let ways = Array.from({ length: m + 1 }, (_, j) => {
		const row = new Array<number>(k + 1).fill(0);
		if (j >= 1) row[1] = 1;
		return row;
	});
	for (let length = 2; length <= n; length++) {
		const next = Array.from({ length: m + 1 }, () =>
			new Array<number>(k + 1).fill(0),
		);
		// below[c] sums ways[j'][c − 1] over the maxima j' smaller than j.
		const below = new Array<number>(k + 1).fill(0);
		for (let j = 1; j <= m; j++) {
			const row = next[j] ?? [];
			for (let c = 1; c <= k; c++) {
				const stay = ((ways[j]?.[c] ?? 0) * j) % MOD;
				row[c] = (stay + (below[c] ?? 0)) % MOD;
			}
			for (let c = 1; c <= k; c++) {
				below[c] = ((below[c] ?? 0) + (ways[j]?.[c - 1] ?? 0)) % MOD;
			}
		}
		ways = next;
	}
	let total = 0;
	for (let j = 1; j <= m; j++) total = (total + (ways[j]?.[k] ?? 0)) % MOD;
	return total;
};

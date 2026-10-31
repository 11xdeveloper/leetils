/**
 * 2819. Minimum Relative Loss After Buying Chocolates
 *
 * For a query `[k, m]`, Bob buys `m` chocolates. He pays up to `k` for
 * each, and Alice pays the rest. His relative loss is what he pays minus
 * what Alice pays. Returns the smallest loss for each query.
 *
 * A chocolate costing `p` costs Bob `p` if `p <= k` and `2k - p`
 * otherwise, which rises then falls with price. So the best choice is the
 * `l` cheapest and `m - l` dearest: binary search the `l` where swapping
 * another cheap one in stops helping, and total with prefix sums.
 *
 * @see https://leetcode.com/problems/minimum-relative-loss-after-buying-chocolates/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumRelativeLossAfterBuyingChocolates([1, 9, 22, 10, 19], [[18, 4], [5, 2]]); // [34, -21]
 */
export const minimumRelativeLossAfterBuyingChocolates = (
	prices: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const sorted = prices.toSorted((a, b) => a - b);
	const n = sorted.length;
	const prefix = [0];
	for (const p of sorted) prefix.push((prefix.at(-1) ?? 0) + p);
	const sum = (from: number, to: number): number =>
		(prefix[to] ?? 0) - (prefix[from] ?? 0);

	return queries.map(([k = 0, m = 0]) => {
		const loss = (p: number): number => (p <= k ? p : 2 * k - p);
		// Smallest l where taking sorted[l] instead of sorted[n - m + l] stops
		// helping. Ties count as helping only on the cheap side, which keeps the
		// condition monotonic.
		const helps = (l: number): boolean => {
			const cheap = sorted[l] ?? 0;
			const dear = sorted[n - m + l] ?? 0;
			return (
				loss(cheap) < loss(dear) || (loss(cheap) === loss(dear) && cheap <= k)
			);
		};
		let low = 0;
		let high = m;
		while (low < high) {
			const mid = (low + high) >> 1;
			if (helps(mid)) low = mid + 1;
			else high = mid;
		}
		const l = low;
		// The cheap end costs at face value up to k; prices above k on either end cost 2k - p.
		const cost = (from: number, to: number): number => {
			let split = from;
			let hi = to;
			while (split < hi) {
				const mid = (split + hi) >> 1;
				if ((sorted[mid] ?? 0) <= k) split = mid + 1;
				else hi = mid;
			}
			return sum(from, split) + 2 * k * (to - split) - sum(split, to);
		};
		return cost(0, l) + cost(n - m + l, n);
	});
};

/**
 * 2070. Most Beautiful Item for Each Query
 *
 * Items are `[price, beauty]`. For each query, returns the greatest beauty
 * of an item priced at most the query, or 0.
 *
 * Sort items by price with running maximum beauty, then binary search
 * each query.
 *
 * @see https://leetcode.com/problems/most-beautiful-item-for-each-query/
 * @difficulty Medium
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n)
 *
 * @example
 * mostBeautifulItemForEachQuery([[1, 2], [3, 2], [2, 4], [5, 6], [3, 5]], [1, 2, 3, 4, 5, 6]); // [2, 4, 5, 5, 6, 6]
 */
export const mostBeautifulItemForEachQuery = (
	items: readonly (readonly number[])[],
	queries: readonly number[],
): number[] => {
	const sorted = items.toSorted((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
	const prices = sorted.map(([price = 0]) => price);
	const bestUpTo: number[] = [];
	for (const [, beauty = 0] of sorted)
		bestUpTo.push(Math.max(bestUpTo.at(-1) ?? 0, beauty));
	return queries.map((query) => {
		let [lo, hi] = [0, prices.length];
		while (lo < hi) {
			const mid = (lo + hi) >> 1;
			if ((prices[mid] ?? 0) > query) hi = mid;
			else lo = mid + 1;
		}
		return bestUpTo[lo - 1] ?? 0;
	});
};

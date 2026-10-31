/**
 * 2064. Minimized Maximum of Products Distributed to Any Store
 *
 * Distributes `quantities[i]` items of product `i` to `n` stores, each
 * store getting at most one product type. Returns the smallest possible
 * largest amount given to one store.
 *
 * Binary search the cap `x`: product `i` then needs `⌈q / x⌉` stores, and
 * the cap works if that totals at most `n`.
 *
 * @see https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store/
 * @difficulty Medium
 * @timeComplexity O(m log max q)
 * @spaceComplexity O(1)
 *
 * @example
 * minimizedMaximumOfProductsDistributedToAnyStore(6, [11, 6]); // 3
 */
export const minimizedMaximumOfProductsDistributedToAnyStore = (
	n: number,
	quantities: readonly number[],
): number => {
	let [lo, hi] = [1, Math.max(...quantities)];
	while (lo < hi) {
		const cap = (lo + hi) >> 1;
		const stores = quantities.reduce((sum, q) => sum + Math.ceil(q / cap), 0);
		if (stores <= n) hi = cap;
		else lo = cap + 1;
	}
	return lo;
};

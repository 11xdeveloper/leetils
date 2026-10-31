/**
 * 2921. Maximum Profitable Triplets With Increasing Prices II
 *
 * Returns the largest `profits[i] + profits[j] + profits[k]` over
 * `i < j < k` with strictly increasing prices, or -1, for arrays too long
 * to try every middle index against every other.
 *
 * Fenwick trees over prices give, for each middle index, the best profit
 * to its left at a lower price and to its right at a higher price.
 *
 * @see https://leetcode.com/problems/maximum-profitable-triplets-with-increasing-prices-ii/
 * @difficulty Hard
 * @timeComplexity O(n log P), where `P` is the largest price
 * @spaceComplexity O(n + P)
 *
 * @example
 * maximumProfitableTripletsWithIncreasingPricesII([1, 2, 3, 4, 5], [1, 5, 3, 4, 6]); // 15
 */
export const maximumProfitableTripletsWithIncreasingPricesII = (
	prices: readonly number[],
	profits: readonly number[],
): number => {
	const n = prices.length;
	const top = Math.max(...prices) + 1;
	/** The best profit seen among prices below `price` (prices counted from 1). */
	const bestBelow = (tree: Int32Array, price: number): number => {
		let best = -1;
		for (let i = price - 1; i > 0; i -= i & -i)
			best = Math.max(best, tree[i] ?? -1);
		return best;
	};
	const record = (tree: Int32Array, price: number, profit: number): void => {
		for (let i = price; i <= top; i += i & -i)
			tree[i] = Math.max(tree[i] ?? -1, profit);
	};

	const leftTree = new Int32Array(top + 1).fill(-1);
	const left = prices.map((price, j) => {
		const best = bestBelow(leftTree, price);
		record(leftTree, price, profits[j] ?? 0);
		return best;
	});
	// Mirror prices so "higher price on the right" becomes "lower" in the tree.
	const rightTree = new Int32Array(top + 1).fill(-1);
	let best = -1;
	for (let j = n - 1; j >= 0; j--) {
		const mirrored = top - (prices[j] ?? 0);
		const right = bestBelow(rightTree, mirrored);
		if ((left[j] ?? -1) >= 0 && right >= 0)
			best = Math.max(best, (left[j] ?? 0) + (profits[j] ?? 0) + right);
		record(rightTree, mirrored, profits[j] ?? 0);
	}
	return best;
};

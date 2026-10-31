/**
 * 3652. Best Time to Buy and Sell Stock using Strategy
 *
 * `strategy[i]` is -1 (buy), 0 (hold) or 1 (sell), so the profit is the
 * sum of `strategy[i] · prices[i]`. Optionally pick `k` consecutive days
 * (k even) and replace their first half with holds and second half with
 * sells. Returns the best profit.
 *
 * Slide the window, tracking the profit it removes and the sum of prices
 * in its second half.
 *
 * @see https://leetcode.com/problems/best-time-to-buy-and-sell-stock-using-strategy/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * bestTimeToBuyAndSellStockUsingStrategy([4, 2, 8], [-1, 0, 1], 2); // 10
 */
export const bestTimeToBuyAndSellStockUsingStrategy = (
	prices: readonly number[],
	strategy: readonly number[],
	k: number,
): number => {
	const n = prices.length;
	const profit = [0];
	const price = [0];
	for (let i = 0; i < n; i++) {
		profit.push((profit[i] ?? 0) + (strategy[i] ?? 0) * (prices[i] ?? 0));
		price.push((price[i] ?? 0) + (prices[i] ?? 0));
	}
	const base = profit[n] ?? 0;
	let best = base;
	for (let start = 0; start + k <= n; start++) {
		const end = start + k;
		const removed = (profit[end] ?? 0) - (profit[start] ?? 0);
		const added = (price[end] ?? 0) - (price[start + k / 2] ?? 0);
		best = Math.max(best, base - removed + added);
	}
	return best;
};

/**
 * 188. Best Time to Buy and Sell Stock IV
 *
 * Given a stock's price on each day, returns the most profit from at most `k`
 * trades, holding at most one share at a time.
 *
 * Tracks, for each trade `t`, the best balance after its buy and after its
 * sell. Each day updates them in order, each trade's buy building on the
 * previous trade's sell. When `k` is at least half the number of days, the
 * limit can't bind, so every rising day is taken instead.
 *
 * @see https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/
 * @difficulty Hard
 * @timeComplexity O(n * min(k, n))
 * @spaceComplexity O(min(k, n))
 *
 * @example
 * bestTimeToBuyAndSellStockIV(2, [3, 2, 6, 5, 0, 3]); // 7: buy at 2, sell at 6, buy at 0, sell at 3
 */
export const bestTimeToBuyAndSellStockIV = (
	k: number,
	prices: readonly number[],
): number => {
	if (2 * k >= prices.length) {
		let profit = 0;
		for (let i = 1; i < prices.length; i++) {
			profit += Math.max(0, (prices[i] ?? 0) - (prices[i - 1] ?? 0));
		}
		return profit;
	}

	const afterBuy = new Array<number>(k).fill(Number.NEGATIVE_INFINITY);
	const afterSell = new Array<number>(k).fill(0);

	for (const price of prices) {
		for (let t = 0; t < k; t++) {
			afterBuy[t] = Math.max(
				afterBuy[t] ?? 0,
				(t === 0 ? 0 : (afterSell[t - 1] ?? 0)) - price,
			);
			afterSell[t] = Math.max(afterSell[t] ?? 0, (afterBuy[t] ?? 0) + price);
		}
	}

	return afterSell[k - 1] ?? 0;
};

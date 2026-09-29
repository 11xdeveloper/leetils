/**
 * 121. Best Time to Buy and Sell Stock
 *
 * Given a stock's price on each day, returns the most profit from buying on
 * one day and selling on a later day, or 0 if no trade makes a profit.
 *
 * Tracks the lowest price so far; selling today makes the most profit when
 * bought at that price.
 *
 * @see https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * bestTimeToBuyAndSellStock([7, 1, 5, 3, 6, 4]); // 5: buy at 1, sell at 6
 */
export const bestTimeToBuyAndSellStock = (
	prices: readonly number[],
): number => {
	let lowest = Number.POSITIVE_INFINITY;
	let best = 0;

	for (const price of prices) {
		lowest = Math.min(lowest, price);
		best = Math.max(best, price - lowest);
	}

	return best;
};

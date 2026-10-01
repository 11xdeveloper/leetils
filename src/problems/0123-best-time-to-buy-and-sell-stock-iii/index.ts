/**
 * 123. Best Time to Buy and Sell Stock III
 *
 * Given a stock's price on each day, returns the most profit from at most two
 * trades, holding at most one share at a time.
 *
 * Tracks the best balance after each of the four actions so far: the first
 * buy, the first sell, the second buy and the second sell. Each day updates
 * them in order, each building on the one before.
 *
 * @see https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * bestTimeToBuyAndSellStockIII([3, 3, 5, 0, 0, 3, 1, 4]); // 6: buy at 0, sell at 3, buy at 1, sell at 4
 */
export const bestTimeToBuyAndSellStockIII = (
	prices: readonly number[],
): number => {
	let firstBuy = Number.NEGATIVE_INFINITY;
	let firstSell = 0;
	let secondBuy = Number.NEGATIVE_INFINITY;
	let secondSell = 0;

	for (const price of prices) {
		firstBuy = Math.max(firstBuy, -price);
		firstSell = Math.max(firstSell, firstBuy + price);
		secondBuy = Math.max(secondBuy, firstSell - price);
		secondSell = Math.max(secondSell, secondBuy + price);
	}

	return secondSell;
};

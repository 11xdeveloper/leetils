/**
 * 122. Best Time to Buy and Sell Stock II
 *
 * Given a stock's price on each day, returns the most profit from any number
 * of trades, holding at most one share at a time. Buying and selling on the
 * same day is allowed.
 *
 * Every rise from one day to the next can be captured by buying the day
 * before and selling that day, so the answer is the sum of all the rises.
 *
 * @see https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * bestTimeToBuyAndSellStockII([7, 1, 5, 3, 6, 4]); // 7: buy at 1, sell at 5, buy at 3, sell at 6
 */
export const bestTimeToBuyAndSellStockII = (
	prices: readonly number[],
): number => {
	let profit = 0;

	for (let i = 1; i < prices.length; i++) {
		profit += Math.max(0, (prices[i] ?? 0) - (prices[i - 1] ?? 0));
	}

	return profit;
};

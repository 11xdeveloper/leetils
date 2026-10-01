/**
 * 714. Best Time to Buy and Sell Stock with Transaction Fee
 *
 * Returns the most profit from trading a stock with daily prices `prices`,
 * holding at most one share at a time and paying `fee` for each completed
 * buy-and-sell.
 *
 * Tracks the best profit so far while holding a share and while not,
 * updating both from the previous day's.
 *
 * @see https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * bestTimeToBuyAndSellStockWithTransactionFee([1, 3, 2, 8, 4, 9], 2); // 8
 */
export const bestTimeToBuyAndSellStockWithTransactionFee = (
	prices: readonly number[],
	fee: number,
): number => {
	let cash = 0;
	let holding = Number.NEGATIVE_INFINITY;
	for (const price of prices) {
		[cash, holding] = [
			Math.max(cash, holding + price - fee),
			Math.max(holding, cash - price),
		];
	}
	return cash;
};

/**
 * 309. Best Time to Buy and Sell Stock with Cooldown
 *
 * Given a stock's price on each day, returns the most profit from any number
 * of trades, holding at most one share at a time, where the day after a
 * sale you can't buy.
 *
 * Tracks the best balance in three states at the end of each day: holding a
 * share, having just sold (so cooling down tomorrow), and free to buy.
 *
 * @see https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * bestTimeToBuyAndSellStockWithCooldown([1, 2, 3, 0, 2]); // 3: buy, sell, cool down, buy, sell
 */
export const bestTimeToBuyAndSellStockWithCooldown = (
	prices: readonly number[],
): number => {
	let holding = Number.NEGATIVE_INFINITY;
	let justSold = 0;
	let free = 0;

	for (const price of prices) {
		[holding, justSold, free] = [
			Math.max(holding, free - price),
			holding + price,
			Math.max(free, justSold),
		];
	}

	return Math.max(justSold, free);
};

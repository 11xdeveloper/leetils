/**
 * 2291. Maximum Profit From Trading Stocks
 *
 * Stock `i` costs `present[i]` now and will sell for `future[i]`. Buying
 * each at most once within `budget`, returns the most profit.
 *
 * A 0/1 knapsack over the stocks worth buying.
 *
 * @see https://leetcode.com/problems/maximum-profit-from-trading-stocks/
 * @difficulty Medium
 * @timeComplexity O(n · budget)
 * @spaceComplexity O(budget)
 *
 * @example
 * maximumProfitFromTradingStocks([5, 4, 6, 2, 3], [8, 5, 4, 3, 5], 10); // 6
 */
export const maximumProfitFromTradingStocks = (
	present: readonly number[],
	future: readonly number[],
	budget: number,
): number => {
	const best = new Array<number>(budget + 1).fill(0);
	for (const [i, cost] of present.entries()) {
		const profit = (future[i] ?? 0) - cost;
		if (profit <= 0) continue;
		for (let money = budget; money >= cost; money--)
			best[money] = Math.max(
				best[money] ?? 0,
				(best[money - cost] ?? 0) + profit,
			);
	}
	return best[budget] ?? 0;
};

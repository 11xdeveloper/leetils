/**
 * 2898. Maximum Linear Stock Score
 *
 * A selection of days is linear if, between consecutive chosen days, the
 * price rises by exactly the number of days passed. Returns the largest
 * total price of a linear selection.
 *
 * Linear days share the same `prices[i] - i`, so group by it and take
 * the best group's total.
 *
 * @see https://leetcode.com/problems/maximum-linear-stock-score/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumLinearStockScore([1, 5, 3, 7, 8]); // 20
 */
export const maximumLinearStockScore = (prices: readonly number[]): number => {
	const totals = new Map<number, number>();
	for (const [i, price] of prices.entries())
		totals.set(price - i, (totals.get(price - i) ?? 0) + price);
	return Math.max(...totals.values());
};

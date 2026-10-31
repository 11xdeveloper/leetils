/**
 * 2907. Maximum Profitable Triplets With Increasing Prices I
 *
 * Returns the largest `profits[i] + profits[j] + profits[k]` over
 * `i < j < k` with strictly increasing prices, or -1 if there is none.
 *
 * For each middle index, take the best profit to its left with a lower
 * price and the best to its right with a higher price.
 *
 * @see https://leetcode.com/problems/maximum-profitable-triplets-with-increasing-prices-i/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumProfitableTripletsWithIncreasingPricesI([10, 2, 3, 4], [100, 2, 7, 10]); // 19
 */
export const maximumProfitableTripletsWithIncreasingPricesI = (
	prices: readonly number[],
	profits: readonly number[],
): number => {
	const n = prices.length;
	let best = -1;
	for (let j = 1; j < n - 1; j++) {
		const price = prices[j] ?? 0;
		let left = -1;
		let right = -1;
		for (let i = 0; i < j; i++)
			if ((prices[i] ?? 0) < price) left = Math.max(left, profits[i] ?? 0);
		for (let k = j + 1; k < n; k++)
			if ((prices[k] ?? 0) > price) right = Math.max(right, profits[k] ?? 0);
		if (left >= 0 && right >= 0)
			best = Math.max(best, left + (profits[j] ?? 0) + right);
	}
	return best;
};

/**
 * 3573. Best Time to Buy and Sell Stock V
 *
 * Make at most `k` transactions, each either normal (buy, later sell) or
 * short (sell, later buy back), one at a time and never two actions on
 * the same day. Returns the most profit.
 *
 * Dynamic programming by day over transactions started and whether we're
 * flat, long or short; each day's values come only from the previous
 * day's, so at most one action happens per day.
 *
 * @see https://leetcode.com/problems/best-time-to-buy-and-sell-stock-v/
 * @difficulty Medium
 * @timeComplexity O(n · k)
 * @spaceComplexity O(k)
 *
 * @example
 * bestTimeToBuyAndSellStockV([1, 7, 9, 8, 2], 2); // 14
 */
export const bestTimeToBuyAndSellStockV = (
	prices: readonly number[],
	k: number,
): number => {
	const NONE = Number.NEGATIVE_INFINITY;
	let flat = new Array<number>(k + 1).fill(NONE);
	let long = new Array<number>(k + 1).fill(NONE);
	let short = new Array<number>(k + 1).fill(NONE);
	flat[0] = 0;
	for (const price of prices) {
		const nextFlat = flat.map((value, j) =>
			Math.max(value, (long[j] ?? NONE) + price, (short[j] ?? NONE) - price),
		);
		const nextLong = long.map((value, j) =>
			Math.max(value, j > 0 ? (flat[j - 1] ?? NONE) - price : NONE),
		);
		const nextShort = short.map((value, j) =>
			Math.max(value, j > 0 ? (flat[j - 1] ?? NONE) + price : NONE),
		);
		[flat, long, short] = [nextFlat, nextLong, nextShort];
	}
	return Math.max(...flat);
};

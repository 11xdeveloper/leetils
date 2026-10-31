/**
 * 2431. Maximize Total Tastiness of Purchased Fruits
 *
 * Buys fruits within `maxAmount`, each at most once, using at most
 * `maxCoupons` coupons that halve a fruit's price (rounded down). Returns
 * the most total tastiness.
 *
 * A 0/1 knapsack over (money spent, coupons used).
 *
 * @see https://leetcode.com/problems/maximize-total-tastiness-of-purchased-fruits/
 * @difficulty Medium
 * @timeComplexity O(n · maxAmount · maxCoupons)
 * @spaceComplexity O(maxAmount · maxCoupons)
 *
 * @example
 * maximizeTotalTastinessOfPurchasedFruits([10, 20, 20], [5, 8, 8], 20, 1); // 13
 */
export const maximizeTotalTastinessOfPurchasedFruits = (
	price: readonly number[],
	tastiness: readonly number[],
	maxAmount: number,
	maxCoupons: number,
): number => {
	// best[c][m]: most tastiness with at most m money and c coupons.
	const best = Array.from({ length: maxCoupons + 1 }, () =>
		new Array<number>(maxAmount + 1).fill(0),
	);
	for (const [i, cost] of price.entries()) {
		const taste = tastiness[i] ?? 0;
		const half = Math.floor(cost / 2);
		for (let c = maxCoupons; c >= 0; c--) {
			const row = best[c] ?? [];
			const fewer = best[c - 1];
			for (let m = maxAmount; m >= 0; m--) {
				if (m >= cost)
					row[m] = Math.max(row[m] ?? 0, (row[m - cost] ?? 0) + taste);
				if (fewer && m >= half)
					row[m] = Math.max(row[m] ?? 0, (fewer[m - half] ?? 0) + taste);
			}
		}
	}
	return best[maxCoupons]?.[maxAmount] ?? 0;
};

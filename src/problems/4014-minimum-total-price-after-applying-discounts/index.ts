/**
 * 4014. Minimum Total Price After Applying Discounts
 *
 * Give each item at most one discount and each discount at most one item.
 * Returns the smallest total price.
 *
 * Pair the biggest discounts with the most expensive items.
 *
 * @see https://leetcode.com/problems/minimum-total-price-after-applying-discounts/
 * @difficulty Medium
 * @timeComplexity O(n log n + m log m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * minimumTotalPriceAfterApplyingDiscounts([10, 30, 21], [50, 60]); // 32.5
 */
export const minimumTotalPriceAfterApplyingDiscounts = (
	prices: readonly number[],
	discounts: readonly number[],
): number => {
	const sortedPrices = [...prices].sort((a, b) => b - a);
	const sortedDiscounts = [...discounts].sort((a, b) => b - a);
	return sortedPrices.reduce(
		(total, p, i) => total + (p * (100 - (sortedDiscounts[i] ?? 0))) / 100,
		0,
	);
};

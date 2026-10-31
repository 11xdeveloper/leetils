/**
 * 2144. Minimum Cost of Buying Candies With Discount
 *
 * Buying two candies gets a third, no more expensive, free. Returns the
 * least cost of all the candies.
 *
 * Sort by price descending and get every third candy free.
 *
 * @see https://leetcode.com/problems/minimum-cost-of-buying-candies-with-discount/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostOfBuyingCandiesWithDiscount([6, 5, 7, 9, 2, 2]); // 23
 */
export const minimumCostOfBuyingCandiesWithDiscount = (
	cost: readonly number[],
): number =>
	cost
		.toSorted((a, b) => b - a)
		.reduce((total, price, i) => (i % 3 === 2 ? total : total + price), 0);

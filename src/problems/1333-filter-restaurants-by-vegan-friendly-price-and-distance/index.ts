/**
 * 1333. Filter Restaurants by Vegan-Friendly, Price and Distance
 *
 * Each restaurant is `[id, rating, veganFriendly, price, distance]`. Returns
 * the ids of those within `maxPrice` and `maxDistance` (and vegan-friendly,
 * if `veganFriendly` is 1), by rating and then id, highest first.
 *
 * Filters, then sorts.
 *
 * @see https://leetcode.com/problems/filter-restaurants-by-vegan-friendly-price-and-distance/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * filterRestaurantsByVeganFriendlyPriceAndDistance([[1, 4, 1, 40, 10], [2, 8, 0, 50, 5], [3, 8, 1, 30, 4], [4, 10, 0, 10, 3], [5, 1, 1, 15, 1]], 1, 50, 10); // [3, 1, 5]
 */
export const filterRestaurantsByVeganFriendlyPriceAndDistance = (
	restaurants: readonly (readonly number[])[],
	veganFriendly: number,
	maxPrice: number,
	maxDistance: number,
): number[] =>
	restaurants
		.filter(
			([, , vegan = 0, price = 0, distance = 0]) =>
				vegan >= veganFriendly && price <= maxPrice && distance <= maxDistance,
		)
		.toSorted((a, b) => (b[1] ?? 0) - (a[1] ?? 0) || (b[0] ?? 0) - (a[0] ?? 0))
		.map(([id = 0]) => id);

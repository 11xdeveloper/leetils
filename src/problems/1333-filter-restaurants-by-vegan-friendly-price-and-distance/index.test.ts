import { describe, expect, it } from "bun:test";
import { filterRestaurantsByVeganFriendlyPriceAndDistance as filterRestaurants } from ".";

describe("1333. Filter Restaurants by Vegan-Friendly, Price and Distance", () => {
	const restaurants = [
		[1, 4, 1, 40, 10],
		[2, 8, 0, 50, 5],
		[3, 8, 1, 30, 4],
		[4, 10, 0, 10, 3],
		[5, 1, 1, 15, 1],
	];

	it("solves the examples from the problem statement", () => {
		expect(filterRestaurants(restaurants, 1, 50, 10)).toEqual([3, 1, 5]);
		expect(filterRestaurants(restaurants, 0, 50, 10)).toEqual([4, 3, 2, 1, 5]);
		expect(filterRestaurants(restaurants, 0, 30, 3)).toEqual([4, 5]);
	});

	it("breaks rating ties by the higher id", () => {
		expect(
			filterRestaurants(
				[
					[1, 5, 0, 1, 1],
					[9, 5, 0, 1, 1],
					[4, 5, 0, 1, 1],
				],
				0,
				1,
				1,
			),
		).toEqual([9, 4, 1]);
	});
});

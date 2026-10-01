import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { canYouEatYourFavoriteCandyOnYourFavoriteDay as canEat } from ".";

/** Tracks every possible number of candies eaten after each day. */
const byBruteForce = (
	candies: number[],
	[type = 0, day = 0, cap = 0]: number[],
): boolean => {
	const total = candies.reduce((sum, count) => sum + count, 0);
	const start = candies.slice(0, type).reduce((sum, count) => sum + count, 0);
	const end = start + (candies[type] ?? 0);
	let possible = new Set([0]);
	for (let d = 0; d <= day; d++) {
		const next = new Set<number>();
		let eatsType = false;
		for (const eaten of possible) {
			if (eaten >= total) continue;
			for (let today = 1; today <= cap && eaten + today <= total; today++) {
				next.add(eaten + today);
				// Candies eaten today are indices eaten … eaten + today − 1.
				if (d === day && eaten < end && eaten + today > start) eatsType = true;
			}
		}
		if (d === day) return eatsType;
		possible = next;
	}
	return false;
};

describe("1744. Can You Eat Your Favorite Candy on Your Favorite Day?", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			canEat(
				[7, 4, 5, 3, 8],
				[
					[0, 2, 2],
					[4, 2, 4],
					[2, 13, 1000000000],
				],
			),
		).toEqual([true, false, true]);
		expect(
			canEat(
				[5, 2, 6, 4, 1],
				[
					[3, 1, 2],
					[4, 10, 3],
					[3, 10, 100],
					[4, 100, 30],
					[1, 3, 1],
				],
			),
		).toEqual([false, true, true, false, false]);
	});

	it("matches tracking every eating schedule on random inputs", () => {
		const random = createRandom(1744);
		for (let run = 0; run < 200; run++) {
			const candies = random.array(random.int(1, 4), 1, 4);
			const query = [
				random.int(0, candies.length - 1),
				random.int(0, 8),
				random.int(1, 4),
			];
			expect(canEat(candies, [query])).toEqual([byBruteForce(candies, query)]);
		}
	});
});

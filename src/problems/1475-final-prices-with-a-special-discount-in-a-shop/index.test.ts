import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { finalPricesWithASpecialDiscountInAShop as finalPrices } from ".";

describe("1475. Final Prices With a Special Discount in a Shop", () => {
	it("solves the examples from the problem statement", () => {
		expect(finalPrices([8, 4, 6, 2, 3])).toEqual([4, 2, 4, 2, 3]);
		expect(finalPrices([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
		expect(finalPrices([10, 1, 1, 6])).toEqual([9, 0, 1, 6]);
	});

	it("matches scanning right for each item on random inputs", () => {
		const random = createRandom(1475);
		for (let run = 0; run < 300; run++) {
			const prices = random.array(random.int(1, 12), 1, 10);
			expect(finalPrices(prices)).toEqual(
				prices.map(
					(price, i) =>
						price - (prices.slice(i + 1).find((p) => p <= price) ?? 0),
				),
			);
		}
	});
});

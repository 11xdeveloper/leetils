import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumProfitableTripletsWithIncreasingPricesI } from "../2907-maximum-profitable-triplets-with-increasing-prices-i";
import { maximumProfitableTripletsWithIncreasingPricesII as maxProfit } from ".";

describe("2921. Maximum Profitable Triplets With Increasing Prices II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxProfit([10, 2, 3, 4], [100, 2, 7, 10])).toBe(19);
		expect(maxProfit([1, 2, 3, 4, 5], [1, 5, 3, 4, 6])).toBe(15);
		expect(maxProfit([4, 3, 2, 1], [33, 20, 19, 87])).toBe(-1);
	});

	it("matches the quadratic version on random inputs", () => {
		const random = createRandom(2921);
		for (let run = 0; run < 300; run++) {
			const n = random.int(3, 12);
			const prices = random.array(n, 1, 8);
			const profits = random.array(n, 1, 20);
			expect(maxProfit(prices, profits)).toBe(
				maximumProfitableTripletsWithIncreasingPricesI(prices, profits),
			);
		}
	});
});

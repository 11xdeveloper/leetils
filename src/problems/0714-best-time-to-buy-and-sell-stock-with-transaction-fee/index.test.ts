import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bestTimeToBuyAndSellStockWithTransactionFee as maxProfit } from ".";

/** Tries holding or not on every day. */
const byBruteForce = (prices: number[], fee: number): number => {
	const search = (day: number, holding: boolean): number => {
		if (day === prices.length) return holding ? Number.NEGATIVE_INFINITY : 0;
		const price = prices[day] ?? 0;
		const wait = search(day + 1, holding);
		return holding
			? Math.max(wait, price - fee + search(day + 1, false))
			: Math.max(wait, -price + search(day + 1, true));
	};
	return search(0, false);
};

describe("714. Best Time to Buy and Sell Stock with Transaction Fee", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxProfit([1, 3, 2, 8, 4, 9], 2)).toBe(8);
		expect(maxProfit([1, 3, 7, 5, 10, 3], 3)).toBe(6);
	});

	it("matches trying every choice on random prices", () => {
		const random = createRandom(714);
		for (let run = 0; run < 500; run++) {
			const prices = random.array(random.int(1, 10), 1, 10);
			const fee = random.int(0, 4);
			expect(maxProfit(prices, fee)).toBe(byBruteForce(prices, fee));
		}
	});
});

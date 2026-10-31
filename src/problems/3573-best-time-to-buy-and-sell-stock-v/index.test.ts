import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bestTimeToBuyAndSellStockV as maximumProfit } from ".";

/** Tries every action on every day. */
const byBruteForce = (prices: number[], k: number): number => {
	const go = (
		day: number,
		left: number,
		holding: number,
		entry: number,
	): number => {
		if (day === prices.length)
			return holding === 0 ? 0 : Number.NEGATIVE_INFINITY;
		const price = prices[day] ?? 0;
		let best = go(day + 1, left, holding, entry);
		if (holding === 0 && left > 0) {
			best = Math.max(
				best,
				go(day + 1, left - 1, 1, price),
				go(day + 1, left - 1, -1, price),
			);
		} else if (holding !== 0)
			best = Math.max(
				best,
				holding * (price - entry) + go(day + 1, left, 0, 0),
			);
		return best;
	};
	return go(0, k, 0, 0);
};

describe("3573. Best Time to Buy and Sell Stock V", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumProfit([1, 7, 9, 8, 2], 2)).toBe(14);
		expect(maximumProfit([12, 16, 19, 19, 8, 1, 19, 13, 9], 3)).toBe(36);
	});

	it("matches trying every action on random prices", () => {
		const random = createRandom(3573);
		for (let run = 0; run < 200; run++) {
			const prices = random.array(random.int(2, 9), 1, 20);
			const k = random.int(1, 4);
			expect(maximumProfit(prices, k)).toBe(byBruteForce(prices, k));
		}
	});
});

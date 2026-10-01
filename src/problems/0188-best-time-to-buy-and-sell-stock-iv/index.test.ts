import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bestTimeToBuyAndSellStockIII } from "../0123-best-time-to-buy-and-sell-stock-iii";
import { bestTimeToBuyAndSellStockIV } from ".";

/** Tries every choice, allowing a limited number of trades. */
const byRecursion = (
	prices: number[],
	trades: number,
	day = 0,
	holding = false,
): number => {
	if (day === prices.length) return 0;
	const price = prices[day] ?? 0;
	const wait = byRecursion(prices, trades, day + 1, holding);
	if (holding)
		return Math.max(
			wait,
			price + byRecursion(prices, trades - 1, day + 1, false),
		);
	if (trades === 0) return wait;
	return Math.max(wait, -price + byRecursion(prices, trades, day + 1, true));
};

describe("188. Best Time to Buy and Sell Stock IV", () => {
	it("solves the examples from the problem statement", () => {
		expect(bestTimeToBuyAndSellStockIV(2, [2, 4, 1])).toBe(2);
		expect(bestTimeToBuyAndSellStockIV(2, [3, 2, 6, 5, 0, 3])).toBe(7);
	});

	it("matches Best Time to Buy and Sell Stock III when k is 2", () => {
		const random = createRandom(1880);
		for (let run = 0; run < 300; run++) {
			const prices = random.array(random.int(1, 30), 0, 20);
			expect(bestTimeToBuyAndSellStockIV(2, prices)).toBe(
				bestTimeToBuyAndSellStockIII(prices),
			);
		}
	});

	it("matches trying every choice on random inputs", () => {
		const random = createRandom(188);
		for (let run = 0; run < 300; run++) {
			const prices = random.array(random.int(1, 10), 0, 10);
			const k = random.int(1, 6);
			expect(bestTimeToBuyAndSellStockIV(k, prices)).toBe(
				byRecursion(prices, k),
			);
		}
	});
});

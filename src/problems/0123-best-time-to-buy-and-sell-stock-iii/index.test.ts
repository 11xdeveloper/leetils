import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bestTimeToBuyAndSellStockIII } from ".";

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

describe("123. Best Time to Buy and Sell Stock III", () => {
	it("solves the examples from the problem statement", () => {
		expect(bestTimeToBuyAndSellStockIII([3, 3, 5, 0, 0, 3, 1, 4])).toBe(6);
		expect(bestTimeToBuyAndSellStockIII([1, 2, 3, 4, 5])).toBe(4);
		expect(bestTimeToBuyAndSellStockIII([7, 6, 4, 3, 1])).toBe(0);
	});

	it("uses only one trade when a second doesn't help", () => {
		expect(bestTimeToBuyAndSellStockIII([1])).toBe(0);
		expect(bestTimeToBuyAndSellStockIII([1, 5])).toBe(4);
	});

	it("matches trying every choice with at most two trades on random inputs", () => {
		const random = createRandom(123);
		for (let run = 0; run < 300; run++) {
			const prices = random.array(random.int(1, 11), 0, 10);
			expect(bestTimeToBuyAndSellStockIII(prices)).toBe(byRecursion(prices, 2));
		}
	});
});

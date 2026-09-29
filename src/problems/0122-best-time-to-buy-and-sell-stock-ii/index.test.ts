import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bestTimeToBuyAndSellStockII } from ".";

/** Tries holding or not holding a share on every day. */
const byRecursion = (prices: number[], day = 0, holding = false): number => {
	if (day === prices.length) return 0;
	const price = prices[day] ?? 0;
	const wait = byRecursion(prices, day + 1, holding);
	return holding
		? Math.max(wait, price + byRecursion(prices, day + 1, false))
		: Math.max(wait, -price + byRecursion(prices, day + 1, true));
};

describe("122. Best Time to Buy and Sell Stock II", () => {
	it("solves the examples from the problem statement", () => {
		expect(bestTimeToBuyAndSellStockII([7, 1, 5, 3, 6, 4])).toBe(7);
		expect(bestTimeToBuyAndSellStockII([1, 2, 3, 4, 5])).toBe(4);
		expect(bestTimeToBuyAndSellStockII([7, 6, 4, 3, 1])).toBe(0);
	});

	it("matches trying every choice of trades on random inputs", () => {
		const random = createRandom(122);
		for (let run = 0; run < 300; run++) {
			const prices = random.array(random.int(1, 12), 0, 10);
			expect(bestTimeToBuyAndSellStockII(prices)).toBe(byRecursion(prices));
		}
	});
});

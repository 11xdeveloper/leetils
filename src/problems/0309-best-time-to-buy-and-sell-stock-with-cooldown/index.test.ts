import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bestTimeToBuyAndSellStockWithCooldown as maxProfit } from ".";

/** Tries every choice on every day, skipping the day after each sale. */
const byRecursion = (prices: number[], day = 0, holding = false): number => {
	if (day >= prices.length) return 0;
	const price = prices[day] ?? 0;
	const wait = byRecursion(prices, day + 1, holding);
	return holding
		? Math.max(wait, price + byRecursion(prices, day + 2, false))
		: Math.max(wait, -price + byRecursion(prices, day + 1, true));
};

describe("309. Best Time to Buy and Sell Stock with Cooldown", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxProfit([1, 2, 3, 0, 2])).toBe(3);
		expect(maxProfit([1])).toBe(0);
	});

	it("matches trying every choice on random inputs", () => {
		const random = createRandom(309);
		for (let run = 0; run < 500; run++) {
			const prices = random.array(random.int(1, 12), 0, 10);
			expect(maxProfit(prices)).toBe(byRecursion(prices));
		}
	});
});

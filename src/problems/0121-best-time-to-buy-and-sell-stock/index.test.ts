import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bestTimeToBuyAndSellStock } from ".";

const byBruteForce = (prices: number[]): number => {
	let best = 0;
	for (let buy = 0; buy < prices.length; buy++) {
		for (let sell = buy + 1; sell < prices.length; sell++) {
			best = Math.max(best, (prices[sell] ?? 0) - (prices[buy] ?? 0));
		}
	}
	return best;
};

describe("121. Best Time to Buy and Sell Stock", () => {
	it("solves the examples from the problem statement", () => {
		expect(bestTimeToBuyAndSellStock([7, 1, 5, 3, 6, 4])).toBe(5);
		expect(bestTimeToBuyAndSellStock([7, 6, 4, 3, 1])).toBe(0);
	});

	it("can't sell before buying", () => {
		expect(bestTimeToBuyAndSellStock([5, 1])).toBe(0);
	});

	it("matches trying every pair of days on random inputs", () => {
		const random = createRandom(121);
		for (let run = 0; run < 500; run++) {
			const prices = random.array(random.int(1, 20), 0, 20);
			expect(bestTimeToBuyAndSellStock(prices)).toBe(byBruteForce(prices));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumProfitFromTradingStocksWithDiscounts as maxProfit } from ".";

/** Tries every set of buyers. */
const byBruteForce = (
	n: number,
	present: number[],
	future: number[],
	hierarchy: number[][],
	budget: number,
): number => {
	const boss = new Array<number>(n + 1).fill(0);
	for (const [b = 0, e = 0] of hierarchy) boss[e] = b;
	let best = 0;
	for (let mask = 0; mask < 1 << n; mask++) {
		let spent = 0;
		let profit = 0;
		for (let v = 1; v <= n; v++) {
			if (!((mask >> (v - 1)) & 1)) continue;
			const b = boss[v] ?? 0;
			const discounted = b > 0 && (mask >> (b - 1)) & 1;
			const price = discounted
				? Math.floor((present[v - 1] ?? 0) / 2)
				: (present[v - 1] ?? 0);
			spent += price;
			profit += (future[v - 1] ?? 0) - price;
		}
		if (spent <= budget) best = Math.max(best, profit);
	}
	return best;
};

describe("3562. Maximum Profit from Trading Stocks with Discounts", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxProfit(2, [1, 2], [4, 3], [[1, 2]], 3)).toBe(5);
		expect(maxProfit(2, [3, 4], [5, 8], [[1, 2]], 4)).toBe(4);
		expect(
			maxProfit(
				3,
				[4, 6, 8],
				[7, 9, 11],
				[
					[1, 2],
					[1, 3],
				],
				10,
			),
		).toBe(10);
		expect(
			maxProfit(
				3,
				[5, 2, 3],
				[8, 5, 6],
				[
					[1, 2],
					[2, 3],
				],
				7,
			),
		).toBe(12);
	});

	it("matches trying every set of buyers on random hierarchies", () => {
		const random = createRandom(3562);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 7);
			const present = random.array(n, 1, 8);
			const future = random.array(n, 1, 12);
			const hierarchy = Array.from({ length: n - 1 }, (_, i) => [
				random.int(1, i + 1),
				i + 2,
			]);
			const budget = random.int(0, 15);
			expect(maxProfit(n, present, future, hierarchy, budget)).toBe(
				byBruteForce(n, present, future, hierarchy, budget),
			);
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sellDiminishingValuedColoredBalls as maxProfit } from ".";

/** Sells one ball at a time from the largest colour. */
const byBruteForce = (inventory: number[], orders: number): number => {
	const counts = [...inventory];
	let profit = 0;
	for (let order = 0; order < orders; order++) {
		const largest = counts.indexOf(Math.max(...counts));
		profit += counts[largest] ?? 0;
		counts[largest] = (counts[largest] ?? 0) - 1;
	}
	return profit;
};

describe("1648. Sell Diminishing-Valued Colored Balls", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxProfit([2, 5], 4)).toBe(14);
		expect(maxProfit([3, 5], 6)).toBe(19);
	});

	it("matches selling one ball at a time on random inputs", () => {
		const random = createRandom(1648);
		for (let run = 0; run < 300; run++) {
			const inventory = random.array(random.int(1, 5), 1, 10);
			const orders = random.int(
				1,
				inventory.reduce((sum, count) => sum + count, 0),
			);
			expect(maxProfit(inventory, orders)).toBe(
				byBruteForce(inventory, orders),
			);
		}
	});

	it("reduces large profits modulo 10^9 + 7", () => {
		expect(maxProfit([1_000_000_000], 1_000_000_000)).toBe(21);
	});
});

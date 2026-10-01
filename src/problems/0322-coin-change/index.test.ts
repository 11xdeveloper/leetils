import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { coinChange } from ".";

/** Breadth-first search over amounts reachable with 1, 2, 3, … coins. */
const byBreadthFirst = (coins: number[], amount: number): number => {
	const seen = new Set([0]);
	let level = [0];
	for (let count = 0; level.length > 0; count++) {
		if (level.includes(amount)) return count;
		const next: number[] = [];
		for (const value of level) {
			for (const coin of coins) {
				const total = value + coin;
				if (total <= amount && !seen.has(total)) {
					seen.add(total);
					next.push(total);
				}
			}
		}
		level = next;
	}
	return -1;
};

describe("322. Coin Change", () => {
	it("solves the examples from the problem statement", () => {
		expect(coinChange([1, 2, 5], 11)).toBe(3);
		expect(coinChange([2], 3)).toBe(-1);
		expect(coinChange([1], 0)).toBe(0);
	});

	it("doesn't just take the largest coin first", () => {
		expect(coinChange([1, 3, 4], 6)).toBe(2);
	});

	it("matches a breadth-first search on random inputs", () => {
		const random = createRandom(322);
		for (let run = 0; run < 500; run++) {
			const coins = random.array(random.int(1, 4), 1, 12);
			const amount = random.int(0, 60);
			expect(coinChange(coins, amount)).toBe(byBreadthFirst(coins, amount));
		}
	});
});

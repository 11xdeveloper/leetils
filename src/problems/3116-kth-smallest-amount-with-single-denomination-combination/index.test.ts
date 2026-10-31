import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { kthSmallestAmountWithSingleDenominationCombination as findKthSmallest } from ".";

/** Walks amounts upwards. */
const byBruteForce = (coins: number[], k: number): number => {
	let found = 0;
	for (let amount = 1; ; amount++)
		if (coins.some((c) => amount % c === 0) && ++found === k) return amount;
};

describe("3116. Kth Smallest Amount With Single Denomination Combination", () => {
	it("solves the examples from the problem statement", () => {
		expect(findKthSmallest([3, 6, 9], 3)).toBe(9);
		expect(findKthSmallest([5, 2], 7)).toBe(12);
	});

	it("matches walking amounts on random coins", () => {
		const random = createRandom(3116);
		for (let run = 0; run < 200; run++) {
			const coins = [...new Set(random.array(random.int(1, 5), 1, 25))];
			const k = random.int(1, 300);
			expect(findKthSmallest(coins, k)).toBe(byBruteForce(coins, k));
		}
	});

	it("handles many coins and huge k", () => {
		const coins = Array.from({ length: 15 }, (_, i) => i + 11);
		expect(findKthSmallest(coins, 2e9)).toBeGreaterThan(0);
		expect(findKthSmallest([25], 2e9)).toBe(5e10);
	});
});

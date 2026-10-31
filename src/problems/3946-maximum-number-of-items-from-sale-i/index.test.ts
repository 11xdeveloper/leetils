import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfItemsFromSaleI as maximumSaleItems } from ".";

/** Tries every number of copies of each item. */
const byBruteForce = (items: number[][], budget: number): number => {
	let best = 0;
	const go = (i: number, left: number, copies: number[]): void => {
		if (i === items.length) {
			let total = copies.reduce((a, b) => a + b, 0);
			items.forEach(([f = 1], a) => {
				if ((copies[a] ?? 0) > 0)
					items.forEach(([g = 1], b) => {
						if (a !== b && g % f === 0) total++;
					});
			});
			best = Math.max(best, total);
			return;
		}
		const price = items[i]?.[1] ?? 1;
		for (let c = 0; c * price <= left; c++)
			go(i + 1, left - c * price, [...copies, c]);
	};
	go(0, budget, []);
	return best;
};

describe("3946. Maximum Number of Items From Sale I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumSaleItems(
				[
					[6, 2],
					[2, 6],
					[3, 4],
				],
				9,
			),
		).toBe(4);
		expect(
			maximumSaleItems(
				[
					[2, 4],
					[3, 2],
					[4, 1],
					[6, 4],
					[12, 4],
				],
				8,
			),
		).toBe(10);
	});

	it("matches trying every purchase on random items", () => {
		const random = createRandom(3946);
		for (let run = 0; run < 100; run++) {
			const items = Array.from({ length: random.int(1, 4) }, () => [
				random.int(1, 6),
				random.int(1, 5),
			]);
			const budget = random.int(1, 12);
			expect(maximumSaleItems(items, budget)).toBe(byBruteForce(items, budget));
		}
	});
});

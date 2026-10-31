import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfItemsFromSaleII as maximumSaleItems } from ".";

/** Tries every number of copies of each item. */
const byBruteForce = (items: number[][], budget: number): number => {
	let best = 0;
	const go = (i: number, left: number, total: number): void => {
		if (i === items.length) {
			best = Math.max(best, total);
			return;
		}
		const [f = 1, price = 1] = items[i] ?? [];
		const bonus = items.filter(([g = 1], j) => j !== i && g % f === 0).length;
		for (let c = 0; c * price <= left; c++)
			go(i + 1, left - c * price, total + c + Math.min(c, bonus));
	};
	go(0, budget, 0);
	return best;
};

describe("3947. Maximum Number of Items From Sale II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumSaleItems(
				[
					[1, 6],
					[2, 4],
					[3, 5],
				],
				19,
			),
		).toBe(5);
		expect(
			maximumSaleItems(
				[
					[2, 8],
					[1, 10],
					[6, 6],
					[4, 12],
					[5, 20],
					[5, 17],
				],
				35,
			),
		).toBe(7);
	});

	it("matches trying every purchase on random items", () => {
		const random = createRandom(3947);
		for (let run = 0; run < 150; run++) {
			const n = random.int(1, 4);
			const items = Array.from({ length: n }, () => [
				random.int(1, n),
				random.int(1, 6),
			]);
			const budget = random.int(1, 15);
			expect(maximumSaleItems(items, budget)).toBe(byBruteForce(items, budget));
		}
	});
});

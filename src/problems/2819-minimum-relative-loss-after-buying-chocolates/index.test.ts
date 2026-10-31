import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumRelativeLossAfterBuyingChocolates as minimumRelativeLosses } from ".";

/** Tries every choice of `m` chocolates. */
const byBruteForce = (prices: number[], queries: number[][]): number[] =>
	queries.map(([k = 0, m = 0]) => {
		let best = Number.POSITIVE_INFINITY;
		for (let mask = 0; mask < 1 << prices.length; mask++) {
			const chosen = prices.filter((_, i) => (mask >> i) & 1);
			if (chosen.length !== m) continue;
			best = Math.min(
				best,
				chosen.reduce((s, p) => s + (p <= k ? p : 2 * k - p), 0),
			);
		}
		return best;
	});

describe("2819. Minimum Relative Loss After Buying Chocolates", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumRelativeLosses(
				[1, 9, 22, 10, 19],
				[
					[18, 4],
					[5, 2],
				],
			),
		).toEqual([34, -21]);
		expect(
			minimumRelativeLosses(
				[1, 5, 4, 3, 7, 11, 9],
				[
					[5, 4],
					[5, 7],
					[7, 3],
					[4, 5],
				],
			),
		).toEqual([4, 16, 7, 1]);
		expect(
			minimumRelativeLosses(
				[5, 6, 7],
				[
					[10, 1],
					[5, 3],
					[3, 3],
				],
			),
		).toEqual([5, 12, 0]);
	});

	it("matches trying every choice on random inputs", () => {
		const random = createRandom(2819);
		for (let run = 0; run < 300; run++) {
			const prices = random.array(random.int(1, 8), 1, 20);
			const queries = Array.from({ length: 3 }, () => [
				random.int(1, 20),
				random.int(1, prices.length),
			]);
			expect(minimumRelativeLosses(prices, queries)).toEqual(
				byBruteForce(prices, queries),
			);
		}
	});
});

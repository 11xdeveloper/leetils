import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfCoinsYouCanGet as maxCoins } from ".";

/** Tries every way to group the piles into threes. */
const byBruteForce = (piles: number[]): number => {
	if (piles.length === 0) return 0;
	let best = 0;
	for (let j = 1; j < piles.length; j++) {
		for (let k = j + 1; k < piles.length; k++) {
			const triple = [piles[0] ?? 0, piles[j] ?? 0, piles[k] ?? 0].sort(
				(a, b) => a - b,
			);
			const rest = piles.filter((_, i) => i !== 0 && i !== j && i !== k);
			best = Math.max(best, (triple[1] ?? 0) + byBruteForce(rest));
		}
	}
	return best;
};

describe("1561. Maximum Number of Coins You Can Get", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxCoins([2, 4, 1, 2, 7, 8])).toBe(9);
		expect(maxCoins([2, 4, 5])).toBe(4);
		expect(maxCoins([9, 8, 7, 6, 5, 1, 2, 3, 4])).toBe(18);
	});

	it("matches trying every grouping on random inputs", () => {
		const random = createRandom(1561);
		for (let run = 0; run < 100; run++) {
			const piles = random.array(3 * random.int(1, 3), 1, 20);
			expect(maxCoins(piles)).toBe(byBruteForce(piles));
		}
	});
});

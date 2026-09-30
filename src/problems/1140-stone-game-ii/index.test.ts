import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stoneGameII } from ".";

/** Plain minimax: returns the mover's stones minus the opponent's. */
const lead = (piles: number[], i: number, m: number): number => {
	if (i >= piles.length) return 0;
	let best = -Infinity;
	let taken = 0;
	for (let x = 1; x <= 2 * m && i + x <= piles.length; x++) {
		taken += piles[i + x - 1] ?? 0;
		best = Math.max(best, taken - lead(piles, i + x, Math.max(m, x)));
	}
	return best;
};

const byBruteForce = (piles: number[]): number => {
	const total = piles.reduce((sum, pile) => sum + pile, 0);
	return (total + lead(piles, 0, 1)) / 2;
};

describe("1140. Stone Game II", () => {
	it("solves the examples from the problem statement", () => {
		expect(stoneGameII([2, 7, 9, 4, 4])).toBe(10);
		expect(stoneGameII([1, 2, 3, 4, 5, 100])).toBe(104);
	});

	it("takes a single pile", () => {
		expect(stoneGameII([5])).toBe(5);
	});

	it("handles a hundred piles", () => {
		const piles = Array.from({ length: 100 }, (_, i) => ((i * 37) % 100) + 1);
		const total = piles.reduce((sum, pile) => sum + pile, 0);
		const alice = stoneGameII(piles);
		expect(alice).toBeGreaterThan(0);
		expect(alice).toBeLessThan(total);
	});

	it("matches plain minimax on random inputs", () => {
		const random = createRandom(1140);
		for (let run = 0; run < 300; run++) {
			const piles = random.array(random.int(1, 10), 1, 20);
			expect(stoneGameII(piles)).toBe(byBruteForce(piles));
		}
	});
});

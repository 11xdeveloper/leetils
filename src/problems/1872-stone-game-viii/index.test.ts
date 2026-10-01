import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stoneGameVIII } from ".";

/** Plays the game directly with minimax. */
const byBruteForce = (stones: number[]): number => {
	const play = (row: number[]): number => {
		if (row.length === 1) return 0;
		let best = -Infinity;
		for (let x = 2; x <= row.length; x++) {
			const sum = row.slice(0, x).reduce((s, v) => s + v, 0);
			best = Math.max(best, sum - play([sum, ...row.slice(x)]));
		}
		return best;
	};
	return play(stones);
};

describe("1872. Stone Game VIII", () => {
	it("solves the examples from the problem statement", () => {
		expect(stoneGameVIII([-1, 2, -3, 4, -5])).toBe(5);
		expect(stoneGameVIII([7, -6, 5, 10, 5, -2, -6])).toBe(13);
		expect(stoneGameVIII([-10, -12])).toBe(-22);
	});

	it("matches minimax on random inputs", () => {
		const random = createRandom(1872);
		for (let run = 0; run < 200; run++) {
			const stones = random.array(random.int(2, 7), -10, 10);
			expect(stoneGameVIII(stones)).toBe(byBruteForce(stones));
		}
	});
});

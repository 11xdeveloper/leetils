import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { cardFlippingGame as flipgame } from ".";

/** Tries every set of flips. */
const byBruteForce = (fronts: number[], backs: number[]): number => {
	let best = Number.POSITIVE_INFINITY;
	for (let mask = 0; mask < 1 << fronts.length; mask++) {
		const up = fronts.map((front, i) =>
			mask & (1 << i) ? (backs[i] ?? 0) : front,
		);
		const down = backs.map((back, i) =>
			mask & (1 << i) ? (fronts[i] ?? 0) : back,
		);
		for (const number of down)
			if (!up.includes(number)) best = Math.min(best, number);
	}
	return best === Number.POSITIVE_INFINITY ? 0 : best;
};

describe("822. Card Flipping Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(flipgame([1, 2, 4, 4, 7], [1, 3, 4, 1, 3])).toBe(2);
		expect(flipgame([1], [1])).toBe(0);
	});

	it("matches trying every set of flips on random cards", () => {
		const random = createRandom(822);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 8);
			const fronts = random.array(n, 1, 5);
			const backs = random.array(n, 1, 5);
			expect(flipgame(fronts, backs)).toBe(byBruteForce(fronts, backs));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeWinFromTwoSegments as maximizeWin } from ".";

/** Tries every pair of segment starts at prize positions. */
const byBruteForce = (positions: number[], k: number): number => {
	let best = 0;
	for (const a of positions)
		for (const b of positions)
			best = Math.max(
				best,
				positions.filter(
					(p) => (p >= a && p <= a + k) || (p >= b && p <= b + k),
				).length,
			);
	return best;
};

describe("2555. Maximize Win From Two Segments", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximizeWin([1, 1, 2, 2, 3, 3, 5], 2)).toBe(7);
		expect(maximizeWin([1, 2, 3, 4], 0)).toBe(2);
	});

	it("matches trying every pair of segments on random inputs", () => {
		const random = createRandom(2555);
		for (let run = 0; run < 300; run++) {
			const positions = random
				.array(random.int(1, 12), 1, 15)
				.sort((a, b) => a - b);
			const k = random.int(0, 4);
			expect(maximizeWin(positions, k)).toBe(byBruteForce(positions, k));
		}
	});
});

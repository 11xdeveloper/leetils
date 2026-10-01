import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { paintHouse } from ".";

/** Tries every colouring with no two neighbours the same. */
const byBruteForce = (costs: number[][], house = 0, previous = -1): number => {
	if (house === costs.length) return 0;
	let best = Number.POSITIVE_INFINITY;
	for (let colour = 0; colour < 3; colour++) {
		if (colour === previous) continue;
		best = Math.min(
			best,
			(costs[house]?.[colour] ?? 0) + byBruteForce(costs, house + 1, colour),
		);
	}
	return best;
};

describe("256. Paint House", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			paintHouse([
				[17, 2, 17],
				[16, 16, 5],
				[14, 3, 19],
			]),
		).toBe(10);
		expect(paintHouse([[7, 6, 2]])).toBe(2);
	});

	it("matches trying every colouring on random inputs", () => {
		const random = createRandom(256);
		for (let run = 0; run < 500; run++) {
			const costs = Array.from({ length: random.int(1, 7) }, () =>
				random.array(3, 1, 20),
			);
			expect(paintHouse(costs)).toBe(byBruteForce(costs));
		}
	});
});

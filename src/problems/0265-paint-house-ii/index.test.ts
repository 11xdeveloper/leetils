import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { paintHouseII } from ".";

/** Tries every colouring with no two neighbours the same. */
const byBruteForce = (costs: number[][], house = 0, previous = -1): number => {
	if (house === costs.length) return 0;
	let best = Number.POSITIVE_INFINITY;
	for (const [colour, cost] of (costs[house] ?? []).entries()) {
		if (colour !== previous)
			best = Math.min(best, cost + byBruteForce(costs, house + 1, colour));
	}
	return best;
};

describe("265. Paint House II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			paintHouseII([
				[1, 5, 3],
				[2, 9, 4],
			]),
		).toBe(5);
		expect(
			paintHouseII([
				[1, 3],
				[2, 4],
			]),
		).toBe(5);
	});

	it("handles a single house", () => {
		expect(paintHouseII([[4, 2, 7]])).toBe(2);
	});

	it("handles two colours tied for cheapest", () => {
		expect(
			paintHouseII([
				[1, 1, 5],
				[1, 1, 5],
			]),
		).toBe(2);
	});

	it("matches trying every colouring on random inputs", () => {
		const random = createRandom(265);
		for (let run = 0; run < 500; run++) {
			const k = random.int(2, 4);
			const costs = Array.from({ length: random.int(1, 6) }, () =>
				random.array(k, 1, 20),
			);
			expect(paintHouseII(costs)).toBe(byBruteForce(costs));
		}
	});
});

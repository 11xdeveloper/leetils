import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { cheapestFlightsWithinKStops as findCheapestPrice } from ".";

/** Tries every route of at most k + 1 flights. */
const byBruteForce = (
	flights: number[][],
	src: number,
	dst: number,
	k: number,
): number => {
	let best = Number.POSITIVE_INFINITY;
	const search = (city: number, cost: number, flightsLeft: number): void => {
		if (city === dst) best = Math.min(best, cost);
		if (flightsLeft === 0) return;
		for (const [from, to = 0, price = 0] of flights)
			if (from === city) search(to, cost + price, flightsLeft - 1);
	};
	search(src, 0, k + 1);
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};

describe("787. Cheapest Flights Within K Stops", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findCheapestPrice(
				4,
				[
					[0, 1, 100],
					[1, 2, 100],
					[2, 0, 100],
					[1, 3, 600],
					[2, 3, 200],
				],
				0,
				3,
				1,
			),
		).toBe(700);
		expect(
			findCheapestPrice(
				3,
				[
					[0, 1, 100],
					[1, 2, 100],
					[0, 2, 500],
				],
				0,
				2,
				1,
			),
		).toBe(200);
		expect(
			findCheapestPrice(
				3,
				[
					[0, 1, 100],
					[1, 2, 100],
					[0, 2, 500],
				],
				0,
				2,
				0,
			),
		).toBe(500);
	});

	it("matches trying every route on random inputs", () => {
		const random = createRandom(787);
		for (let run = 0; run < 500; run++) {
			const n = random.int(2, 5);
			const flights = Array.from({ length: random.int(0, 8) }, () => [
				random.int(0, n - 1),
				random.int(0, n - 1),
				random.int(1, 20),
			]).filter(([from, to]) => from !== to);
			const [src, dst] = [0, n - 1];
			const k = random.int(0, 3);
			expect(findCheapestPrice(n, flights, src, dst, k)).toBe(
				byBruteForce(flights, src, dst, k),
			);
		}
	});
});

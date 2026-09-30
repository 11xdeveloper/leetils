import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { paintHouseIII as minCost } from ".";

/** Tries every colouring of the unpainted houses. */
const byBruteForce = (
	houses: number[],
	cost: number[][],
	n: number,
	target: number,
): number => {
	let best = Infinity;
	const colours = [...houses];
	const paint = (i: number, total: number): void => {
		if (i === houses.length) {
			const neighbourhoods = colours.filter(
				(c, j) => j === 0 || c !== colours[j - 1],
			).length;
			if (neighbourhoods === target) best = Math.min(best, total);
			return;
		}
		if (houses[i] !== 0) {
			paint(i + 1, total);
			return;
		}
		for (let colour = 1; colour <= n; colour++) {
			colours[i] = colour;
			paint(i + 1, total + (cost[i]?.[colour - 1] ?? 0));
		}
		colours[i] = 0;
	};
	paint(0, 0);
	return best === Infinity ? -1 : best;
};

describe("1473. Paint House III", () => {
	const cost = [
		[1, 10],
		[10, 1],
		[10, 1],
		[1, 10],
		[5, 1],
	];

	it("solves the examples from the problem statement", () => {
		expect(minCost([0, 0, 0, 0, 0], cost, 5, 2, 3)).toBe(9);
		expect(minCost([0, 2, 1, 2, 0], cost, 5, 2, 3)).toBe(11);
		expect(
			minCost(
				[3, 1, 2, 3],
				[
					[1, 1, 1],
					[1, 1, 1],
					[1, 1, 1],
					[1, 1, 1],
				],
				4,
				3,
				3,
			),
		).toBe(-1);
	});

	it("matches trying every colouring on random streets", () => {
		const random = createRandom(1473);
		for (let run = 0; run < 200; run++) {
			const [m, n] = [random.int(1, 6), random.int(1, 3)];
			const houses = Array.from({ length: m }, () =>
				random.next() < 0.3 ? random.int(1, n) : 0,
			);
			const costs = Array.from({ length: m }, () => random.array(n, 1, 10));
			const target = random.int(1, m);
			expect(minCost(houses, costs, m, n, target)).toBe(
				byBruteForce(houses, costs, n, target),
			);
		}
	});
});

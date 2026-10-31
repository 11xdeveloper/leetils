import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { paintHouseIV as minCost } from ".";

/** Tries every colouring. */
const byBruteForce = (n: number, cost: number[][]): number => {
	let best = Number.POSITIVE_INFINITY;
	for (let code = 0; code < 3 ** n; code++) {
		const colours: number[] = [];
		for (let rest = code, i = 0; i < n; i++, rest = Math.floor(rest / 3))
			colours.push(rest % 3);
		if (
			colours.some(
				(c, i) => (i > 0 && c === colours[i - 1]) || c === colours[n - 1 - i],
			)
		)
			continue;
		best = Math.min(
			best,
			colours.reduce((sum, c, i) => sum + (cost[i]?.[c] ?? 0), 0),
		);
	}
	return best;
};

describe("3429. Paint House IV", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minCost(4, [
				[3, 5, 7],
				[6, 2, 9],
				[4, 8, 1],
				[7, 3, 5],
			]),
		).toBe(9);
		expect(
			minCost(6, [
				[2, 4, 6],
				[5, 3, 8],
				[7, 1, 9],
				[4, 6, 2],
				[3, 5, 7],
				[8, 2, 4],
			]),
		).toBe(18);
	});

	it("matches trying every colouring on random costs", () => {
		const random = createRandom(3429);
		for (let run = 0; run < 100; run++) {
			const n = 2 * random.int(1, 4);
			const cost = Array.from({ length: n }, () => random.array(3, 0, 9));
			expect(minCost(n, cost)).toBe(byBruteForce(n, cost));
		}
	});
});

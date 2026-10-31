import { describe, expect, it } from "bun:test";
import { minimumCostPathWithAlternatingDirectionsI as minCost } from ".";

/** Searches the moves, which can't leave a small band of cells. */
const byBruteForce = (m: number, n: number): number => {
	let best = Number.POSITIVE_INFINITY;
	const walk = (r: number, c: number, move: number, cost: number): void => {
		if (r === m - 1 && c === n - 1) best = Math.min(best, cost);
		if (move > 2 * (m + n)) return;
		const steps =
			move % 2 === 1
				? [
						[1, 0],
						[0, 1],
					]
				: [
						[-1, 0],
						[0, -1],
					];
		for (const [dr = 0, dc = 0] of steps) {
			const [nr, nc] = [r + dr, c + dc];
			if (nr >= 0 && nc >= 0 && nr < m && nc < n)
				walk(nr, nc, move + 1, cost + (nr + 1) * (nc + 1));
		}
	};
	walk(0, 0, 1, 1);
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};

describe("3596. Minimum Cost Path with Alternating Directions I", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCost(1, 1)).toBe(1);
		expect(minCost(2, 1)).toBe(3);
	});

	it("matches searching moves on small grids", () => {
		for (let m = 1; m <= 4; m++)
			for (let n = 1; n <= 4; n++)
				expect(minCost(m, n)).toBe(byBruteForce(m, n));
	});
});

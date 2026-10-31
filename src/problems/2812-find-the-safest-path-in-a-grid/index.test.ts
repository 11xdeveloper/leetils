import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheSafestPathInAGrid as maximumSafenessFactor } from ".";

/** Tries each safeness from the top with a flood fill. */
const byBruteForce = (grid: number[][]): number => {
	const n = grid.length;
	const thieves: [number, number][] = [];
	for (const [r, row] of grid.entries())
		for (const [c, cell] of row.entries()) if (cell === 1) thieves.push([r, c]);
	const safety = (r: number, c: number): number =>
		Math.min(...thieves.map(([a, b]) => Math.abs(a - r) + Math.abs(b - c)));
	for (let s = 2 * n; s >= 0; s--) {
		if (safety(0, 0) < s) continue;
		const seen = new Set(["0,0"]);
		const stack: [number, number][] = [[0, 0]];
		for (let cell = stack.pop(); cell; cell = stack.pop()) {
			const [r, c] = cell;
			for (const [nr, nc] of [
				[r - 1, c],
				[r + 1, c],
				[r, c - 1],
				[r, c + 1],
			] as const)
				if (
					nr >= 0 &&
					nc >= 0 &&
					nr < n &&
					nc < n &&
					!seen.has(`${nr},${nc}`) &&
					safety(nr, nc) >= s
				) {
					seen.add(`${nr},${nc}`);
					stack.push([nr, nc]);
				}
		}
		if (seen.has(`${n - 1},${n - 1}`)) return s;
	}
	return 0;
};

describe("2812. Find the Safest Path in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumSafenessFactor([
				[1, 0, 0],
				[0, 0, 0],
				[0, 0, 1],
			]),
		).toBe(0);
		expect(
			maximumSafenessFactor([
				[0, 0, 1],
				[0, 0, 0],
				[0, 0, 0],
			]),
		).toBe(2);
		expect(
			maximumSafenessFactor([
				[0, 0, 0, 1],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[1, 0, 0, 0],
			]),
		).toBe(2);
	});

	it("matches trying each safeness on random grids", () => {
		const random = createRandom(2812);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 6);
			const grid = Array.from({ length: n }, () =>
				Array.from({ length: n }, () => (random.int(0, 5) === 0 ? 1 : 0)),
			);
			(grid[random.int(0, n - 1)] ?? [])[random.int(0, n - 1)] = 1;
			expect(maximumSafenessFactor(grid)).toBe(byBruteForce(grid));
		}
	});
});
